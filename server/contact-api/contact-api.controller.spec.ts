import { Test, TestingModule } from '@nestjs/testing';
import { ContactApiController } from './contact-api.controller';

describe('ContactController', () => {
  let controller: ContactApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactApiController],
    }).compile();

    controller = module.get<ContactApiController>(ContactApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
