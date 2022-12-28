import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulApiService } from './contentful-api.service';

describe('ContentfulApiService', () => {
  let service: ContentfulApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulApiService,
      ],
    }).compile();

    service = module.get<ContentfulApiService>(ContentfulApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
