'use strict';

const express = require('express');

// Constants
const PORT = 80;

// App
const app = express();
app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/BallotPresenter.js', function (req, res) {
  res.sendfile('public/BallotPresenter.js');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
