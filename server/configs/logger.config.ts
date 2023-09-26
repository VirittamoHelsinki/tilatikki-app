import winston from 'winston';
import * as config from '../utils/config';

const enumrateErrorFormat = winston.format((info: any) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });

const logger = winston.createLogger({
  level: config.node_env === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    enumrateErrorFormat(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.splat(),
    winston.format.printf(({ level, message}) => {return `${level}: ${message}`})),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ],
});

export default logger

