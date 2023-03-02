import { Module } from '@nestjs/common';
import { SitemapService } from '@server/sitemap/sitemap.service';
import { RootController } from '@server/sitemap/root.controller';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';

@Module({
  providers: [
    SitemapService,
    ContentfulApiService,
  ],
  controllers: [
    RootController,
  ],
})
export class RootModule { }
