const express = require('express');

const estimator = require('../estimator');

const app = express();

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const output = estimator(req.body);
  res.type('application/json');
  res.send(output);
});


module.exports = app;
