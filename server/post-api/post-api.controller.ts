import {
  Controller, Get, Inject, Query,
} from '@nestjs/common';
import { Posts } from '@server/models/posts';
import { PostApiService } from '@server/post-api/post-api.service';
import { Observable } from 'rxjs';

@Controller('post-api')
export class PostApiController {
  constructor(
    @Inject(PostApiService) private readonly postApiService: PostApiService,
  ) {}

  @Get('/posts')
  getPosts(
    @Query('user') user: string,
  ): Observable<Posts> {
    return this.postApiService.getPosts(user);
  }
}
