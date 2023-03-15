import { Inject, Injectable } from '@angular/core';
import { ConfigService } from '@nestjs/config';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  EnumChangefreq, SitemapItem, SitemapStream, streamToPromise,
} from 'sitemap';

@Injectable()
export class RootService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async getSitemap(entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>, hostUrl: string): Promise<Buffer> {
    const sitemapStream = new SitemapStream({
      hostname: hostUrl,
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

  getRobotsContent(protocol: string, host: string): string {
    return `User-agent: * \nDisallow: \nSitemap: ${protocol}://${host}/sitemap.xml`;
  }

  getClientConfiguration(): ClientConfiguration {
    return this.configService.get<ClientConfiguration>('client', { infer: true });
  }
}
