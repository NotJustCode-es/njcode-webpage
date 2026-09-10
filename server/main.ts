/* eslint-disable */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(process.env['PREFIX'] || '/api', { exclude: ['sitemap.xml', 'robots.txt'] })
  app.enableCors()
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe( {
    whitelist: true,
  }));
  app.getHttpAdapter().getInstance().set('trust proxy', 1)
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
