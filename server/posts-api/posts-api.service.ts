import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Posts } from '@server/models/posts';
import {
  catchError, map, Observable, of,
} from 'rxjs';

@Injectable()
export class PostsApiService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  getPosts(user: string): Observable<Posts> {
    const RSSUrl = `https://medium.com/feed/@${user}`;
    const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;
    return this.httpService.get<Posts>(RSSConverter, {
      headers: { 'Accept-Encoding': 'application/json' },
    }).pipe(
      map(response => response.data),
      catchError(() => of({ } as Posts)),
    );
  }
}
