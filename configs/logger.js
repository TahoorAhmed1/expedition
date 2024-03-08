const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');

// const { stringify } = require('flatted');

const { combine, colorize, simple } = format;
// const path = require('path');

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console(),
    // new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    // new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
  ],
  format: combine(colorize({ colors: { info: 'blue' } }), simple()),
});

// const reqLogger = (req, res, next) => {
//   res.on('finish', () => {
//     console.log('ok');

//     return expressWinston.logger({
//       transports: [new transports.Console()],
//       format: combine(colorize(), simple()),
//       meta: false,
//       metaField: null,
//       msg: function () {
//         return `\n - Incoming request: {{req.method}} {{req.url}}\n - Request body: ${JSON.stringify(
//           req.body,
//         )}\n - Status code: {{res.statusCode}}\n - Response body: ${JSON.stringify(res.body)}\n - Response time: {{res.responseTime}}ms\n `;
//       },
//       colorize: true,
//     });
//   });
//   next();
// };

const reqLogger = expressWinston.logger({
  transports: [new transports.Console()],
  format: combine(colorize(), simple()),
  meta: false,
  metaField: null,
  msg(req) {
    return `\n - Incoming request: {{req.method}} {{req.url}}\n - Request body: ${JSON.stringify(
      req.body,
    )}\n - Status code: {{res.statusCode}}\n - Response time: {{res.responseTime}}ms\n `;
  },
  colorize: true,
});

module.exports = { logger, reqLogger };
