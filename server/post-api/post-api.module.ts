import { Module } from '@nestjs/common';
import { ContentfulApiModule } from '@server/contentful-api/contentful-api.module';
import { PostApiController } from '@server/post-api/post-api.controller';
import { PostApiService } from './post-api.service';

@Module({
  providers: [
    PostApiService,
  ],
  exports: [
    PostApiService,
  ],
  controllers: [
    PostApiController,
  ],
  imports: [
    ContentfulApiModule,
  ],
})
export class PostApiModule {}
