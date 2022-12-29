import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
import configuration from './core/config/configuration';

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
        configuration,
      ],
      isGlobal: true,
    }),
    ContentfulApiModule,
  ],
})
export class AppModule {
}
