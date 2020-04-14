const express = require('express');

const js2xmlparser = require('js2xmlparser');

const covid19ImpactEstimator = require('../estimator');

const app = express();

app.post('/api/v1/on-covid-19/json', (req, res, next) => {
  const output = covid19ImpactEstimator(req.body);
  res.type('application/json');
  res.send(output);
  next();
});

app.post('/api/v1/on-covid-19/xml', (req, res, next) => {
  const output = covid19ImpactEstimator(req.body);
  res.type('application/xml');
  res.send(js2xmlparser.parse(output));
  next();
});

module.exports = app;
