import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';
import { ContactApiModule } from './contact-api/contact-api.module';
import { AppServerModule } from '../src/main.server';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
import { RootModule } from './root/root.module';
import configFactory from './core/config/config-factory';

const browserAppLocation = 'dist/njcode-webpage/browser';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), browserAppLocation),
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secretKey: config.get('GOOGLE_RECAPTCHA_SECRET_KEY'),
        response: (req: IncomingMessage):string => (req.headers['recaptcha'] || '').toString(),
        // skipIf: process.env?.['NODE_ENV'] !== 'production',
        actions: ['sendMail'],
        score: 0.8,

      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: [
        '.env.dev', '.env',
      ],
      load: [
        configFactory,
      ],
      isGlobal: true,
    }),
    ContentfulApiModule,
    ContactApiModule,
    RootModule,
  ],
})
export class AppModule { }
