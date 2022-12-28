import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platform: string,
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (isPlatformBrowser(this.platform)) {
      const url = this.generateUrlKey(req.urlWithParams);
      const key: StateKey<string> = makeStateKey(url);
      const storedResponse: string | null = this.transferState.get(key, null);
      if (storedResponse) {
        const response = new HttpResponse({ body: storedResponse, status: 200 });
        if (req.method !== 'GET') {
          this.transferState.remove(key);
        }
        return of(response);
      }
    }
    return next.handle(req);
  }

  private generateUrlKey(url: string): string {
    if (url.includes('/api/')) {
      return `/api/${url.split('/api/')[1]}`;
    }
    return url;
  }
}
