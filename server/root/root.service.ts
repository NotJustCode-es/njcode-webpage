import { Injectable } from '@nestjs/common';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  EnumChangefreq, SitemapItem, SitemapStream, streamToPromise,
} from 'sitemap';

@Injectable()
export class RootService {
  async getSitemap(entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>, originUrl: string): Promise<Buffer> {
    const sitemapStream = new SitemapStream({
      hostname: originUrl,
    });

    entries.items.forEach(entry => {
      sitemapStream.write({
        changefreq: EnumChangefreq.MONTHLY,
        lastmod: entry.sys.updatedAt,
        priority: 1.0,
        url: entry.fields.slug,
      } as SitemapItem);
    });

    sitemapStream.end();
    return streamToPromise(sitemapStream);
  }

  getRobotsContent(protocol: string, origin: string): string {
    return `User-agent: * \nDisallow: \nSitemap: ${protocol}://${origin}/sitemap.xml`;
  }
}
