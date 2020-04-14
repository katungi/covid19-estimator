
const express = require('express');

const js2xmlparser = require('js2xmlparser');

const responseTime = require('response-time');

const responseTimeHandler = require('./handlers');

const covid19ImpactEstimator = require('../estimator');

const app = express();

app.use(responseTimeHandler);

app.use(express.json());

app.use(responseTime());

app.post('/api/v1/on-covid-19/json', (req, res, next) => {
  const output = covid19ImpactEstimator(req.body);
  res.type('application/json');
  res.send(output);
  next();
});

app.post('/api/v1/on-covid-19/xml', (req, res, next) => {
  res.header('Content-Type', 'application/xml');
  res.type('application/xml');
  const output = covid19ImpactEstimator(req.body);
  const estimate = js2xmlparser.parse('estimate', output);
  res.send(estimate);
  next();
});

app.get('/api/v1/on-covid-19/logs', (req, res, next) => {
  res.setHeader('content-type', 'text/plain');
  res.type('text/plain');
  res.send(responseTimeHandler);
  next();
});

app.get('/', (req, res, next) => {
  res.send('Covid 19 Estimator api');
  next();
});
module.exports = app;
