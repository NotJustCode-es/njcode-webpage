import { Injectable } from '@nestjs/common';
import { Posts } from '@server/models/posts';
import fetch, { Response } from 'node-fetch';
import { from, Observable } from 'rxjs';

@Injectable()
export class PostApiService {
  getPosts(user: string): Observable<Posts> {
    return from(this.getMediumPosts(user));
  }

  async getMediumPosts(user: string): Promise<Posts> {
    const RSSUrl = `https://medium.com/feed/@${user}`;
    const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;
    const response: Response = await fetch(RSSConverter);
    const data = await response.json() as Posts;
    return data;
  }
}
