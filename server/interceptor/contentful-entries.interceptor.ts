import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException,
} from '@nestjs/common';
import { EntryCollection } from 'contentful';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class ContentfulEntriesInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      switchMap((response: Observable<EntryCollection<unknown>>) => response),
      tap(data => {
        if (data.total === 0) {
          throw new NotFoundException(data);
        }
      }),
    );
  }
}
