const createHomepageTemplate = () => /*html*/`
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <script>console.log("Node.js + SQLite")</script>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>My Reading List</h1>
      </header>

      <main>

      <div class="search" style="text-align: center;">
          <input 
            type="search"
            name="search"
            placeholder="Search books by title..."
            hx-post="/books/search"
            hx-trigger="keyup changed delay:300ms"
            hx-target=".book-list"
          />
        </div> 

        <div class="book-list">
          <button hx-get="/books" hx-target=".book-list" hx-trigger="dblclick">Show Books</button>
        </div>

        <div class="add-book-form">
          <h2>What do you want to read?</h2>
          <form
            hx-post="/books" 
            hx-target=".book-list ul" 
            hx-swap="beforeend" 
            hx-on::after-request="document.querySelector('form').reset()"
          >
            <input 
              id="title" 
              name="title"
              placeholder="title" 
              type="text"
              required 
            />
            <input 
              id="author" 
              name="author"
              placeholder="author" 
              type="text"
              required
            />
            <button>Add</button>
          </form>
        </div>
      </main>
    </body>
  </html>
`;

export default createHomepageTemplate;

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("my.db");

const execute = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};




const main = async () => {
  const db = new sqlite3.Database("my.db");
  const sql = `INSERT INTO products(name, price) VALUES(?, ?)`;
  try {
    await execute(db, sql, ["iPhone", 899.99]);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
};

main();