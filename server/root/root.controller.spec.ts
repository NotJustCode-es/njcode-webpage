import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { contentfulApiStub } from '@server/shared/testing/stub/contentful-api.stub';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { RootService } from './root.service';
import { RootController } from './root.controller';

describe('ContactController', () => {
  let controller: RootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [
        RootService,
        {
          provide: ConfigService,
          useClass: configServiceStub,
        },
        {
          provide: ContentfulApiService,
          useClass: contentfulApiStub,
        },
      ],

    }).compile();

    controller = module.get<RootController>(RootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
