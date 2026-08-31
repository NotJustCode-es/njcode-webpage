import { Injectable } from '@nestjs/common';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { AI_CRAWLER_USER_AGENTS } from '@server/root/ai-crawler-user-agents.const';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { environment } from '@environments/environment';
import {
  EnumChangefreq, SitemapItem, SitemapStream, streamToPromise,
} from 'sitemap';

@Injectable()
export class RootService {
  async getSitemap(entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>, hostname?: string): Promise<Buffer> {
    const sitemapStream = new SitemapStream({
      hostname,
    });

    entries.items.forEach(entry => {
      environment.i18n.availableLangs.forEach(lang => {
        sitemapStream.write({
          changefreq: EnumChangefreq.MONTHLY,
          lastmod: entry.sys.updatedAt,
          priority: 1.0,
          url: `${lang}${entry.fields.slug}`,
        } as SitemapItem);
      });
    });

    sitemapStream.end();
    return streamToPromise(sitemapStream);
  }

  getRobotsContent(hostname: string): string {
    const aiGroup = AI_CRAWLER_USER_AGENTS
      .map(agent => `User-agent: ${agent}`)
      .join('\n');

    return `${aiGroup}
Disallow: /
DisallowAITraining: /

User-agent: *
DisallowAITraining: /
Content-Usage: ai=n
Content-Signal: search=yes, ai-input=no, ai-train=no
Allow: /

Sitemap: ${hostname}/sitemap.xml`;
  }
}
