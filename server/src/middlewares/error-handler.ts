import type {Request, Response, NextFunction} from 'express';
import logger from '@/utils/logger.js';

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.error(error.stack);
  response.status(500).send('Something broke!');
};
