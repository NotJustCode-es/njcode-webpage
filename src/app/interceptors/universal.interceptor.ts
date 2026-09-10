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
    if (!this.serverUrl) {
      return next.handle(req);
    }

    const port = process.env['PORT'] || '4000';
    const originHeader = process.env['X_FROM_CLOUDFRONT'];
    return next.handle(req.clone({
      url: `http://127.0.0.1:${port}${req.url}`,
      setHeaders: originHeader
        ? { 'x-from-cloudfront': originHeader }
        : {},
    }));
  }
}
