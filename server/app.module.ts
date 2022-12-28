import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { ContentfulApiModule } from './contentful-api/contentful-api.module';
import configuration from './core/config/configuration';
import { BROWSER_APP_LOCATION, FrontendMiddleware } from './middleware/frontend.middleware';

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
  providers: [
    {
      provide: BROWSER_APP_LOCATION,
      useValue: browserAppLocation,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware)
      .forRoutes({
        path: '**',
        method: RequestMethod.GET,
      });
  }
}
