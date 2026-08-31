import { Test, TestingModule } from '@nestjs/testing';
import { getTestSitemap } from '@server/shared/testing/snapshots/sitemap.snapshot.xml';
import { createTestEntryCollection } from '@server/shared/testing/utils/contentful-entry-collection.util';
import { AI_CRAWLER_USER_AGENTS } from '@server/root/ai-crawler-user-agents.const';
import { RootService } from '@server/root/root.service';

describe('RootService', () => {
  let service: RootService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RootService],
    }).compile();

    service = module.get<RootService>(RootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('sitemap should generate proper xml', () => {
    const hostname = 'http://localhost:4200';
    service.getSitemap(createTestEntryCollection(), hostname)
      .then(
        data => {
          expect(data.toString()).toBe(getTestSitemap());
        },
      );
  });

  it('should create valid robots', () => {
    const hostname = 'http://localhost:4200';
    const aiGroup = AI_CRAWLER_USER_AGENTS
      .map(agent => `User-agent: ${agent}`)
      .join('\n');

    expect(service.getRobotsContent(hostname)).toEqual(`${aiGroup}
Disallow: /
DisallowAITraining: /

User-agent: *
DisallowAITraining: /
Content-Usage: ai=n
Content-Signal: search=yes, ai-input=no, ai-train=no
Allow: /

Sitemap: ${hostname}/sitemap.xml`);
  });
});
