import { Test, TestingModule } from '@nestjs/testing';
import { getTestSitemap } from '@server/shared/testing/snapshots/sitemap.snapshot.xml';
import { createTestEntryCollection } from '@server/shared/testing/utils/contentful-entry-collection.util';
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
    expect(service.getRobotsContent(hostname)).toEqual(`User-agent: * \nAllow: / \n\nSitemap: ${hostname}/sitemap.xml`);
  });
});
