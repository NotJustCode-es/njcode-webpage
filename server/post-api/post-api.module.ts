import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostApiController } from '@server/post-api/post-api.controller';
import { PostApiService } from '@server/post-api/post-api.service';

@Module({
  providers: [
    PostApiService,
  ],
  imports: [
    HttpModule,
  ],
  controllers: [
    PostApiController,
  ],
})
export class PostApiModule {}
