import {
  Controller, Get, Inject, Query,
} from '@nestjs/common';
import { Post } from '@server/models/post';
import { PostsApiService } from '@server/posts-api/posts-api.service';
import { Observable } from 'rxjs';

@Controller('posts-api')
export class PostsApiController {
  constructor(
    @Inject(PostsApiService) private readonly postsApiService: PostsApiService,
  ) {}

  @Get('/posts')
  getPosts(
    @Query('user') user: string,
  ): Observable<Post[]> {
    return this.postsApiService.getPosts(user);
  }
}
