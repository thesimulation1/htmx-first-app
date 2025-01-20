import express from 'express';
import createHomepageTemplate from './views/index.js';
import createListTemplate from './views/list.js';
import createBookTemplate from './views/book.js';
import createEditFormTemplate from './views/edit.js';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import BOOKS_DATA from './data/data.js';



// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

//Create Database
const db = new sqlite3.Database('books.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the books.db database.');

    db.run(`CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        // Insert initial data
        const insertBook = 'INSERT INTO books (title, author) VALUES (?, ?)';
        BOOKS_DATA.forEach(book => {
          db.run(insertBook, [book.title, book.author], (err) => {
            if (err) {
              console.error('Error inserting data:', err.message);
            }
          });
        });
      }
    });
  }
});

// routes
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});

app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching books');
    } else {
      res.send(createListTemplate(rows));
    }
  });
});

app.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  const insertBook = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.run(insertBook, [title, author], function (err) {
    if (err) {
      res.status(500).send('Error adding book');
    } else {
      res.redirect('/books');
    }
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send('Error fetching book');
    } else {
      res.send(createBookTemplate(row));
    }
  });
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send('Error deleting book');
    } else {
      //console.log(res.sendStatus(200));
      //res.sendStatus(200);
    }
  });
});

app.put('/books/:id', (req, res) => {
  const { title, author } = req.body;
  const { id } = req.params;

  const updateBook = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
  db.run(updateBook, [title, author, id], function (err) {
    if (err) {
      res.status(500).send('Error updating book');
    } else {
      db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
          res.status(500).send('Error fetching updated book');
        } else {
          res.send(createBookTemplate(row));
        }
      });
    }
  });
});

app.get('/books/edit/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send('Error fetching book for edit');
    } else {
      res.send(createEditFormTemplate(row));
    }
  });
});

app.post('/books/search', (req, res) => {
  const text = req.body.search.toLowerCase();
  const searchBooks = 'SELECT * FROM books WHERE LOWER(title) LIKE ?';
  db.all(searchBooks, [`%${text}%`], (err, rows) => {
    if (err) {
      res.status(500).send('Error searching books');
    } else {
      res.send(createListTemplate(rows));
    }
  });
});

const setup = async () => {
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  })
}

setup();