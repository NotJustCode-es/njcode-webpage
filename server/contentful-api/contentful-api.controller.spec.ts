import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { ContentfulPageQueryParams } from '@server/models/contentful-page-query-params';
import { contentfulApiStub } from '@server/shared/testing/stub/contentful-api.stub';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { ContentfulApiController } from '@server/contentful-api/contentful-api.controller';

describe('ContentfulApiController', () => {
  let controller: ContentfulApiController;
  let service: ContentfulApiService;

  const pageQueryParams = {
    slug: 'test',
  } as ContentfulPageQueryParams;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        ContentfulApiController,
      ],
      providers: [ContentfulApiService,
        {
          provide: ConfigService,
          useClass: configServiceStub,
        },
        {
          provide: ContentfulApiService,
          useClass: contentfulApiStub,
        }],
    }).compile();

    controller = module.get<ContentfulApiController>(ContentfulApiController);
    service = module.get<ContentfulApiService>(ContentfulApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service getPage', async () => {
    const serviceSpy = jest.spyOn(service, 'getPage');
    controller.getPage(pageQueryParams);
    expect(serviceSpy).toHaveBeenCalledWith(pageQueryParams);
  });
});
