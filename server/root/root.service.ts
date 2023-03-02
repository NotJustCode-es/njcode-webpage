import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  EnumChangefreq, SitemapItem, SitemapStream, streamToPromise,
} from 'sitemap';

@Injectable()
export class RootService {
  private xml!: Promise<Buffer>;

  async getSitemap(entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>): Promise<Buffer> {
    // this.params = { slug: 'asd', locale: 'awd', limit: 1000 };

    try {
      const sitemapStream = new SitemapStream({
        hostname: environment.hostUrl,
      });
      // const pipeline = sitemapStream.pipe(createGzip());

      entries.items.forEach(entry => {
        sitemapStream.write({
          changefreq: EnumChangefreq.MONTHLY,
          lastmod: entry.sys.updatedAt,
          priority: 0.7,
          url: entry.fields.slug,
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
