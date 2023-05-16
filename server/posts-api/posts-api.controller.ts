import {
  Controller, Get, Inject, Query,
} from '@nestjs/common';
import { Posts } from '@server/models/posts';
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
  ): Observable<Posts> {
    return this.postsApiService.getPosts(user);
  }
}
