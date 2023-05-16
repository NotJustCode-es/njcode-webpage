import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '@server/models/posts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly getPostsPath = '/api/post-api/posts/';

  constructor(private httpClient: HttpClient) { }

  getPosts(user: string): Observable<Posts> {
    const params = new HttpParams()
      .set('user', user);
    return this.httpClient.get<Posts>(
      this.getPostsPath,
      { params },
    );
  }
}
