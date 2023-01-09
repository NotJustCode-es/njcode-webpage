import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RoutesEnum } from '@core/models/routes.enum';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.router.navigateByUrl(RoutesEnum.NotFound, { replaceUrl: true });
          return EMPTY;
        }
        return throwError(() => new Error(error));
      }),
    );
  }
}
