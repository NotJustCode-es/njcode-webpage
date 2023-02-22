import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { GoogleRecaptchaModule, GoogleRecaptchaNetwork } from '@nestlab/google-recaptcha';
import { NodemailerApiModule } from './nodemailer/nodemailer-api.module';
import { AppServerModule } from '../src/main.server';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
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
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        response: req => req.headers.recaptcha,
        // skipIf: process.env?.['NODE_ENV'] !== 'production',
        network: GoogleRecaptchaNetwork.Recaptcha,
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
    NodemailerApiModule,
  ],
})
export class AppModule { }
