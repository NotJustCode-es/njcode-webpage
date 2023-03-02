import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  EnumChangefreq, SitemapItem, SitemapStream, streamToPromise,
} from 'sitemap';

@Injectable()
export class RootService {
  async getSitemap(entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>): Promise<Buffer> {
    const sitemapStream = new SitemapStream({
      hostname: environment.hostUrl,
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
}
