import createSidebarTemplate from './sidebar.js';



const createHomepageTemplate = () => /*html*/`
  <!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
      <script>console.log("Node.js + SQLite")</script>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body id="main">
      ${createSidebarTemplate()}
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

        <div class="book-graph">
          <button hx-get="/graph" hx-target=".book-graph" hx-trigger="dblclick">Show Graph</button>
        </div>

        <div class="add-book-form">
          <h2>What do you want to read?</h2>
          <form
            hx-post="/books" 
            hx-target=".book-list ul" 
            hx-swap="beforeend" 
            hx-on::after-request="document.querySelector('form').reset()"
            onsubmit="return confirm('Do you want to submit?')"
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
            <input 
              id="year" 
              name="year"
              placeholder="year" 
              type="text"
              required
            />
            <input 
              id="price" 
              name="price"
              placeholder="price" 
              type="text"
              required
            />
            <input 
              id="pages" 
              name="pages"
              placeholder="pages" 
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

