const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, prettyPrint } = format;
const winston = require('winston')

// Create the logger
const logger = createLogger({
  format: combine(
    timestamp(),
    json(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
  ],
  level:'debug',
});

module.exports = logger;
