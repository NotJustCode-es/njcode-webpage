import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ContentfulApiService } from './contentful-api.service';
import { ContentfulApiController } from './contentful-api.controller';
import { contentfulConfig } from '../shared/testing/utils/contentfulConfig.utils';

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
          useValue: {
            get: jest.fn(() => contentfulConfig()),
          },

        }],
    }).compile();

    controller = module.get<ContentfulApiController>(ContentfulApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
