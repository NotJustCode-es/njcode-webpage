import {
  Controller, Get, Header, Inject, UseInterceptors,
} from '@nestjs/common';
import { ContentfulEntriesInterceptor } from '../interceptor/contentful-entries.interceptor';
import { SitemapService } from './sitemap.service';

@Controller('')
@UseInterceptors(ContentfulEntriesInterceptor)
export class RootController {
  constructor(@Inject(SitemapService) private readonly sitemapService: SitemapService) {}

  @Header('Content-Type', 'application/xml')
  @Get('/sitemap.xml')
  async getEntries():Promise<Buffer> {
    return this.sitemapService.getSitemap();
  }
}
