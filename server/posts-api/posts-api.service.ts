import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Post } from '@server/models/post';
import {
  catchError, from, Observable, of, switchMap,
} from 'rxjs';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class PostsApiService {
  private readonly RSSU = 'https://medium.com/feed/';

  constructor(@Inject(HttpService) readonly httpService: HttpService) {}

  getPosts(user: string): Observable<Post[]> {
    const xmlUrl = `${this.RSSU}${user}`;
    const Posts = this.httpService.get<string>(xmlUrl, {
      headers: { 'Accept-Encoding': 'application/xml' },
    }).pipe(
      switchMap(response => from(this.getContent(response.data))),
      catchError(() => of([])),
    );
    return Posts;
  }

  private async getContent(xmlString: string): Promise<Post[]> {
    return parseStringPromise(xmlString, {
      tagNameProcessors: [this.normalizeTagsName],
      valueProcessors: [this.getThumbnail],
    }).then(result => Promise.resolve(result.rss.channel[0].item as Post[]))
      .catch(error => Promise.reject(error));
  }

  private normalizeTagsName(name: string): string {
    switch (name) {
      case 'content:encoded':
        return 'thumbnail';
      case 'category':
        return 'categories';
      default:
        return name;
    }
  }

  private getThumbnail(name: string): string {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = name.match(regex);

    return match ? match[1] : name;
  }
}
