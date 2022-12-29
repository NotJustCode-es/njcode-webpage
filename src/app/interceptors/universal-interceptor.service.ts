import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UniversalInterceptorService implements HttpInterceptor {
  constructor(@Optional() @Inject('serverUrl') protected serverUrl: string) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const serverReq = !this.serverUrl
      ? req
      : req.clone({
        url: `${this.serverUrl}${req.url}`,
      });

    return next.handle(serverReq);
  }
}
