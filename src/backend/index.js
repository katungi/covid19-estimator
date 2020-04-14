import fs from 'fs';

const express = require('express');

const js2xmlparser = require('js2xmlparser');

const responseTime = require('response-time');

const covid19ImpactEstimator = require('../estimator');

const app = express();

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

// app.get('/api/v1/on-covid-19/logs', (req, res, next, time) => {
//   const dur = console.log(req.method, req.url, time);
//   res.header('Content-Type', 'text/plain; charset=utf-8');
//   res.send(dur);
//   next();
// });

module.exports = app;
