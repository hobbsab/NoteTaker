const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) => {
  console.info(`${req.method} request received for feedback`);

  readFileAsync('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // generate unique ID for the note
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(newNote);
});

module.exports = fb;
