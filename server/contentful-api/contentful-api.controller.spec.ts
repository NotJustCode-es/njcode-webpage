import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { ContentfulApiService } from './contentful-api.service';
import { ContentfulApiController } from './contentful-api.controller';

describe('ContentfulApiController', () => {
  let controller: ContentfulApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        ContentfulApiController,
      ],
      providers: [ContentfulApiService,
        {
          provide: ConfigService,
          useClass: configServiceStub,
        }],
    }).compile();

    controller = module.get<ContentfulApiController>(ContentfulApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
