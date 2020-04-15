const fs = require('fs');
const responseTime = require('response-time');

const toServerLog = async (logInput) => {
  const line = `${logInput}\n`;
  await fs.appendFileSync('./logs/request-response/logs.txt', line, (err) => {
    if (err) throw err;
  });
};

const responseTimeHandler = responseTime((req, res, time) => {
  const duration = Math.round(time);
  const timeDiff = duration < 10 ? `0${duration}` : duration;
  const path = req.path[req.path.length - 1] === '/' ? (req.path).substring(0, req.path.length - 1) : req.path;
  toServerLog(`${req.method} ${req.baseUrl ? req.baseUrl : ''} ${path} ${res.statusCode} ${timeDiff}ms`);
});

module.exports = responseTimeHandler;
