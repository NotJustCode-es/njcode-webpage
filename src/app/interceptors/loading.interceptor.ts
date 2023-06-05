import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '@services/loading/loading.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private readonly loadingService: LoadingService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.interceptRequest(request)) {
      return next.handle(request);
    }
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => this.loadingService.setLoading(false)),
    );
  }

  private interceptRequest(request: HttpRequest<unknown>): boolean {
    const interceptRequestHeader = request.headers.get(LoadingService.interceptRequestHeader);
    return !(interceptRequestHeader && interceptRequestHeader === 'false');
  }
}
