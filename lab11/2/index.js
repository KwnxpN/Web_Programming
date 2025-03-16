const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Set up database
const db = new sqlite3.Database('todo.db');
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  deadline TEXT,
  status INTEGER DEFAULT 0
)`);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Home page - show todo list
app.get('/shows', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, todos) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('shows', { todos: todos });
  });
});

// Add todo page
app.get('/add-todo', (req, res) => {
  res.render('add-todo');
});

// Process form submission
app.post('/add-todo', (req, res) => {
  const { title, description, deadline } = req.body;
  
  db.run(
    'INSERT INTO todos (title, description, deadline) VALUES (?, ?, ?)',
    [title, description, deadline],
    function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/shows');
    }
  );
});

// Toggle todo status
app.get('/toggle/:id', (req, res) => {
  const id = req.params.id;
  
  db.run(
    'UPDATE todos SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/shows');
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});