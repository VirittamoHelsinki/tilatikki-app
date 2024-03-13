import winston from 'winston';
import { node_env } from './config';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, { message: info.stack });
  }
  return info;
});

// Set the logger level based on the environment
const level = () => {
  if (node_env === 'production') return 'info';
  if (node_env === 'test') return 'silent';
  return 'debug'; // For development and other environments
};

const logger = winston.createLogger({
  level: level(),
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      // Set to false if you want to suppress logs to the console in certain environments
      silent: node_env === 'test',
    })
  ],
});

export default logger;
