import { Test, TestingModule } from '@nestjs/testing';
import { ContactApiService } from './contact-api.service';

describe('MailService', () => {
  let service: ContactApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactApiService],
    }).compile();

    service = module.get<ContactApiService>(ContactApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
