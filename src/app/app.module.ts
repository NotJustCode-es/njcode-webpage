import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { DynamicRouteReuseStrategy } from '@core/strategies/dynamic-route-reuse.strategy';
import { BrowserStateInterceptor } from '@interceptors/browser-state.interceptor';
import { NotFoundInterceptor } from '@interceptors/not-found.interceptor';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotFoundInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: DynamicRouteReuseStrategy,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
