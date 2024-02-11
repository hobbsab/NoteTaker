const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 3001;
const app = express();
const api = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
)

app.listen(port, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);