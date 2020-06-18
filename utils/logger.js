const winston = require('winston');

const { createLogger, format, transports } = winston;

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow',
  },
};

const consoleTransport = new (transports.Console)({
  colorize: true,
  level: 'verbose',
});

const logger = createLogger({
  transports: [
    consoleTransport,
  ],
  levels: config.levels,
  format: format.combine(
    winston.format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.simple(),
  ),
});

module.exports.info = function info(message) {
  logger.log('info', message);
};

module.exports.error = function error(message) {
  logger.log('error', message);
};

module.exports.debug = function debug(message) {
  logger.log('debug', message);
};

module.exports.warn = function warn(message) {
  logger.log('warn', message);
};
