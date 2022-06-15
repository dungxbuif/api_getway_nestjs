import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerService implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

      if (statusCode >= 200 && statusCode <= 400) {
        this.logger.log(message);
      } else {
        this.logger.warn(message);
      }
    });

    if (!process.env.NODE_ENV) {
      if (Object.keys(request.query).length) {
        console.log('query', request.query);
      }
      if (Object.keys(request.body).length) {
        console.log('body', request.body);
      }
    }
    next();
  }
}
