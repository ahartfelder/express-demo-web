const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize, json, errors } = format;

const consoleFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
);

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  json()
);

const createDailyRotateTransport = (type) =>
  new DailyRotateFile({
    filename: `logs/${type}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: type,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });

const infoTransport = createDailyRotateTransport('info');
const errorTransport = createDailyRotateTransport('error');

const logger = createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new transports.Console({ format: combine(colorize(), consoleFormat) }),
    infoTransport,
    errorTransport,
  ],
});

module.exports = logger;
