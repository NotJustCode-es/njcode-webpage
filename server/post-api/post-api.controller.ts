import { Controller, Get, Inject } from '@nestjs/common';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { Posts } from '@server/models/posts';
import { PostApiService } from '@server/post-api/post-api.service';
import { Observable, switchMap } from 'rxjs';

@Controller('post-api')
export class PostApiController {
  constructor(
    @Inject(PostApiService) private readonly postApiService: PostApiService,
    @Inject(ContentfulApiService) private readonly contentfulApiService: ContentfulApiService,
  ) {}

  @Get('/posts')
  getPosts(): Observable<Posts> {
    return this.contentfulApiService.getMediumPostsUser()
      .pipe(
        switchMap(response => this.postApiService.getPosts(response.items[0].fields.user)),
      );
  }
}
