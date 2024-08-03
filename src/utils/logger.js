const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize, json, errors } = format;

const consoleFormat = printf((info) => {
  const hasDuration =
    info.message === 'RESPONSE' ? ` (${info.duration}ms)` : '';
  let isRequest = info.method
    ? ` ${info.method} ${info.path}${hasDuration}`
    : '';

  return `${info.timestamp} [${info.level}]: ${info.message}${isRequest}`;
});

const createDailyRotateTransport = (type) =>
  new DailyRotateFile({
    filename: `logs/${type}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    level: type,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });

const infoTransport = createDailyRotateTransport('http');
const errorTransport = createDailyRotateTransport('error');

const logger = createLogger({
  level: 'http',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    json()
  ),
  transports: [infoTransport, errorTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({ format: combine(colorize(), consoleFormat) })
  );
}

module.exports = logger;
