import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerStateInterceptor } from '@interceptors/server-state.interceptor';
import { UniversalInterceptorService } from '@interceptors/universal.interceptor';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
