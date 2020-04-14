import fs from 'fs';

import { Router } from 'express';

const path = require('path');

const express = require('express');

const js2xmlparser = require('js2xmlparser');

const morgan = require('morgan');

// const responseTime = require('response-time');

const covid19ImpactEstimator = require('../estimator');

const app = express();

app.use(express.json());

// app.use(responseTime());

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

Router.get('/api/v1/on-covid-19/logs', (req, res, next) => {
  const format = ':method\t\t:url\t\t:status\t\t:response-time[0]ms';
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan(format, { stream: accessLogStream }));
  res.header('Content-Type', 'text/plain; charset=utf-8');
  next();
});

module.exports = app;
