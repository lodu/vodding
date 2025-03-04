import type {Request, Response, NextFunction} from 'express';
import logger from '@/utils/logger.js';

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.info(`${request.method} ${request.url}`);
  next();
};
