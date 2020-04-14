const express = require('express');

const js2xmlparser = require('js2xmlparser');

const covid19ImpactEstimator = require('../estimator');

const app = express();

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const output = covid19ImpactEstimator(req.body);
  res.type('application/json');
  res.send(output);
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const output = covid19ImpactEstimator(req.body);
  res.type('application/xml');

});


module.exports = app;
