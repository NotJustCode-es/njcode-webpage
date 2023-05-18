import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@server/models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly getPostsPath = '/api/posts-api/posts/';

  constructor(private httpClient: HttpClient) { }

  getPosts(user: string): Observable<Post[]> {
    const params = new HttpParams()
      .set('user', user);
    return this.httpClient.get<Post[]>(
      this.getPostsPath,
      { params },
    );
  }
}
