import { Module } from '@nestjs/common';
import { ContentfulApiController } from './contentful-api.controller';
import { ContentfulApiService } from './contentful-api.service';

@Module({
  providers: [
    ContentfulApiService,
  ],
  controllers: [
    ContentfulApiController,
  ],
})
export class ContentfulApiModule {}
