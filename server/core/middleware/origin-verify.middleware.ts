import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const LOOPBACK_ADDRESSES = new Set([
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
]);

@Injectable()
export class OriginVerifyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const originHeader = process.env['X_FROM_CLOUDFRONT'];
    if (!originHeader) {
      next();
      return;
    }

    const remoteAddress = req.socket?.remoteAddress || '';
    if (LOOPBACK_ADDRESSES.has(remoteAddress) || LOOPBACK_ADDRESSES.has(req.ip || '')) {
      next();
      return;
    }

    const incoming = req.headers['x-from-cloudfront'];
    const value = Array.isArray(incoming) ? incoming[0] : incoming;
    if (value !== originHeader) {
      res.status(403).send('Forbidden');
      return;
    }

    next();
  }
}
