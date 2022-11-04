const winston = require('winston');

// internalLogger
const internalLogger = winston.createLogger({
  transports: new winston.transports.File({
    filename: 'internal-errors.log',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

module.exports = {
  internalLogger,
};
