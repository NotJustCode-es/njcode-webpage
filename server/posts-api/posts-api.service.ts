import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Post } from '@server/models/post';
import { parseStringPromise } from 'xml2js';
import {
  catchError, Observable, of, switchMap,
} from 'rxjs';

@Injectable()
export class PostsApiService {
  private readonly RSSU = 'https://medium.com/feed/@';

  constructor(@Inject(HttpService) readonly httpService: HttpService) {}

  getPosts(user: string): Observable<Post[]> {
    const xmlUrl = `${this.RSSU}${user}`;
    const Posts = this.httpService.get<string>(xmlUrl, {
      headers: { 'Accept-Encoding': 'application/xml' },
    }).pipe(
      switchMap(response => this.getContent(response.data)),
      catchError(() => of(null as unknown as Post[])),
    );
    return Posts;
  }

  private async getContent(xmlString: string):Promise<Post[]> {
    const posts = await parseStringPromise(xmlString, {
      tagNameProcessors: [this.normalizeTagsName],
      valueProcessors: [this.getThumbnail],
    }).then(result => Promise.resolve(result.rss.channel[0].item as Post[]))
      .catch(error => Promise.reject(error));
    return posts;
  }

  private normalizeTagsName(name: string): string {
    const searchContentName = 'content:encoded';
    const searchCategoriesName = 'category';
    const desiredContentName = 'thumbnail';
    const desiredCategoriesName = 'categories';

    switch (name) {
      case searchContentName:
        return desiredContentName;
      case searchCategoriesName:
        return desiredCategoriesName;
      default:
        return name;
    }
  }

  private getThumbnail(name: string): string {
    const regex = /<img[^>]+src="([^">]+)"/;
    const match = name.match(regex);

    if (match) {
      return match[1];
    }
    return name;
  }
}
