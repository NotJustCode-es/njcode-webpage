import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { contentfulConfig } from '../shared/testing/utils/contentfulConfig.utils';
import { ContentfulApiService } from './contentful-api.service';

describe('ContentfulApiService', () => {
  let service: ContentfulApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulApiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => contentfulConfig()),
          },

        },
      ],
    }).compile();

    service = module.get<ContentfulApiService>(ContentfulApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
