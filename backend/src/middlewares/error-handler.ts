import { Request, Response, NextFunction } from 'express';
import { ApiErrorModel } from '../models/common/ApiErrorModel';
import { ApiErrorViewModel } from '../models/view/ApiErrorViewModel';
import { logger } from './logger';

export default function errorHandler(
  err: ApiErrorModel,
  req: Request,
  res: Response<ApiErrorViewModel>,
  next: NextFunction,
) {
  const error = `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
    req.method
  } - ${req.ip}`;
  console.error(error);
  logger(error);
  res.status(err.status || 500);
  res.json({
    message:
      req.app.get('env') === 'development'
        ? err.message
        : 'Unknown error happened',
  });
}
