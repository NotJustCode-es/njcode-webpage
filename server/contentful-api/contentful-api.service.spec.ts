import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { ContentfulApiService } from './contentful-api.service';

describe('ContentfulApiService', () => {
  let service: ContentfulApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulApiService,
        {
          provide: ConfigService,
          useClass: configServiceStub,
        },
      ],
    }).compile();

    service = module.get<ContentfulApiService>(ContentfulApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
