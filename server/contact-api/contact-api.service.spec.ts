import { Test, TestingModule } from '@nestjs/testing';
import { getContactTestingModule } from '../shared/testing/contact-testing.module';
import { ContactApiService } from './contact-api.service';

describe('ContactService', () => {
  let service: ContactApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactApiService],
      imports: [
        getContactTestingModule(),
      ],
    }).compile();

    service = module.get<ContactApiService>(ContactApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
