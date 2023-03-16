import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { ContactApiModule } from './contact-api/contact-api.module';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
import configFactory from './core/config/config-factory';
import { RootModule } from './root/root.module';

const browserAppLocation = 'dist/njcode-webpage/browser';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), browserAppLocation),
      inlineCriticalCss: false,
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secretKey: config.get('GOOGLE_RECAPTCHA_SECRET_KEY'),
        response: (req: IncomingMessage):string => (req.headers['recaptcha'] || '').toString(),
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
    RootModule,
    ContentfulApiModule,
    ContactApiModule,
  ],
})
export class AppModule { }
