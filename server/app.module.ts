import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';
import { join } from 'path';
import { RootModule } from '@server/root/root.module';
import { ContactApiModule } from '@server/contact-api/contact-api.module';
import { ContentfulApiModule } from '@server/contentful-api/contentful-api.module';
import configFactory from '@server/core/config/config-factory';
import { PostApiModule } from '@server/post-api/post-api.module';
import { AppServerModule } from '../src/main.server';

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
    PostApiModule,
  ],
})
export class AppModule { }
