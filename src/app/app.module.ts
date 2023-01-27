import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLoaderModule } from '@components/page-loader/page-loader.module';
import { CoreModule } from '@core/core.module';
import { BrowserStateInterceptor } from '@interceptors/browser-state.interceptor';
import { LoadingInterceptor } from '@interceptors/loading.interceptor';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { GoogleAnalyticsService } from '@services/google-analytics/google-analytics.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'NJCodeServerApp',
    }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    PageLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: GoogleAnalyticsService.factory,
      multi: true,
      deps: [
        GoogleAnalyticsService,
      ],
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
