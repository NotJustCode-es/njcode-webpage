import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostsApiController } from '@server/posts-api/posts-api.controller';
import { PostsApiService } from '@server/posts-api/posts-api.service';

@Module({
  providers: [
    PostsApiService,
  ],
  imports: [
    HttpModule,
  ],
  controllers: [
    PostsApiController,
  ],
})
export class PostsApiModule {}
