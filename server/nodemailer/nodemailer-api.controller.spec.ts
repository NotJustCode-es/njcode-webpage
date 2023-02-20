import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerApiController } from './nodemailer-api.controller';

describe('MailController', () => {
  let controller: NodemailerApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodemailerApiController],
    }).compile();

    controller = module.get<NodemailerApiController>(NodemailerApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
