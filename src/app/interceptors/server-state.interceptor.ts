import { isPlatformServer } from '@angular/common';
import {
  HttpEvent,
  HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap(event => {
        if (isPlatformServer(this.platformId) && (event instanceof HttpResponse && req.method === 'GET')) {
          const url = this.generateUrlKey(req.urlWithParams);
          this.transferState.set(makeStateKey(url), event.body);
        }
      }),
    );
  }

  private generateUrlKey(url: string): string {
    if (url.includes('/api/')) {
      return `/api/${url.split('/api/')[1]}`;
    }
    return url;
  }
}
