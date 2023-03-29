import { Module } from '@nestjs/common';
import { ContentfulApiController } from '@server/contentful-api/contentful-api.controller';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';

@Module({
  providers: [
    ContentfulApiService,
  ],
  controllers: [
    ContentfulApiController,
  ],
  exports: [
    ContentfulApiService,
  ],
})
export class ContentfulApiModule {}
