/* eslint-disable */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(process.env['PREFIX'] || '/api', { exclude: ['sitemap.xml', 'robots.txt'] })
  app.enableCors()
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe( {
    whitelist: true,
  }));

  const originHeader = process.env['X_FROM_CLOUDFRONT']
  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.set('trust proxy', 1)
  expressApp.use((req: Request, res: Response, next: NextFunction) => {
    if (!originHeader) {
      return next()
    }
    const ip = req.ip || ''
    if (ip === '127.0.0.1' || ip === '::1') {
      return next()
    }
    if (req.headers['x-from-cloudfront'] !== originHeader) {
      return res.status(403).send('Forbidden');
    }
    next()
  })

  await app.listen(process.env['PORT'] || 4000)
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire
const mainModule = __non_webpack_require__.main
const moduleFilename = (mainModule && mainModule.filename) || ''
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => console.error(err))
}
