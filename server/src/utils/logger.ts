import {createLogger, format, transports, type Logform} from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(
      (info: Logform.TransformableInfo) =>
        `${info.timestamp as string} ${info.level}: ${info.message as string}`,
    ),
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'logs/error.log', level: 'error'}),
    new transports.File({filename: 'logs/combined.log'}),
  ],
});

// If (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     })
//   );
// }

export default logger;
