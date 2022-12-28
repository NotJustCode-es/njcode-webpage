import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulApiController } from './contentful-api.controller';

describe('ContentfulApiController', () => {
  let controller: ContentfulApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        ContentfulApiController,
      ],
    }).compile();

    controller = module.get<ContentfulApiController>(ContentfulApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
