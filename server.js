const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT||3001;
const app = express();
const api = require('./routes/index');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// HTML paths
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
)

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to read notes from db.json
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notes);
});

// POST route to add a new note to db.json
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // generate unique ID for the note
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes));
  res.json(newNote);
});

// app listening at the port 3001
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));