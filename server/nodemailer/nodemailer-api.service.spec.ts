import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerApiService } from './nodemailer-api.service';

describe('MailService', () => {
  let service: NodemailerApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodemailerApiService],
    }).compile();

    service = module.get<NodemailerApiService>(NodemailerApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
