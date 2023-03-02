import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
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
      inlineCriticalCss: false,
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
    RootModule,
  ],
})
export class AppModule { }
