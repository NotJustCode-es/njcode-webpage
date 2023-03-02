import { Inject, Injectable } from '@angular/core';

import {
  SitemapStream, EnumChangefreq, SitemapItem, streamToPromise,
} from 'sitemap';
import { environment } from '@environments/environment';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
// import { ContentfulPageQueryParams } from '../models/contentful-page-query-params';

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  // private params!: ContentfulPageQueryParams;

  private xml!: Promise<Buffer>;

  constructor(
    @Inject(ContentfulApiService) private contentfulApiService: ContentfulApiService,
  ) { }

  async getSitemap(): Promise<Buffer> {
    // this.params = { slug: 'asd', locale: 'awd', limit: 1000 };

    try {
      const sitemapStream = new SitemapStream({
        hostname: environment.hostUrl,
      });
      // const pipeline = sitemapStream.pipe(createGzip());

      this.contentfulApiService.getAllPages(1000).forEach(entry => {
        sitemapStream.write({
          changefreq: EnumChangefreq.MONTHLY,
          lastmod: entry.items[0].sys.updatedAt,
          priority: 0.7,
          url: entry.items[0].fields.slug,
        } as SitemapItem);
      });

      // Add any other sitemap items for other pages of your site
      sitemapStream.write({
        changefreq: EnumChangefreq.DAILY,
        priority: 1,
        url: '',
      } as SitemapItem);

      // Stream write the response
      sitemapStream.end();
      this.xml = streamToPromise(sitemapStream);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return this.xml;
  }
}
