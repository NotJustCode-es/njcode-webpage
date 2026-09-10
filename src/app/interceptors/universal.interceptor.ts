import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UniversalInterceptorService implements HttpInterceptor {
  constructor(
    @Optional() @Inject('serverUrl') protected serverUrl: string,
    @Optional() @Inject(REQUEST) private readonly request?: Request,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.serverUrl) {
      return next.handle(req);
    }

    const originHeader = this.getCloudFrontOriginHeader();
    return next.handle(req.clone({
      url: `${this.toHttpServerUrl()}${req.url}`,
      setHeaders: originHeader
        ? { 'x-from-cloudfront': originHeader }
        : {},
    }));
  }

  private toHttpServerUrl(): string {
    return this.serverUrl.replace(/^https:/, 'http:');
  }

  private getCloudFrontOriginHeader(): string | undefined {
    const value = this.request?.headers['x-from-cloudfront'];
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }
}
