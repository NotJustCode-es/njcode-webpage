import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { contactStub } from '@server/shared/testing/stub/contact.stub';
import { ContactApiService } from './contact-api.service';

describe('ContactService', () => {
  let service: ContactApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactApiService,
        {
          provide: MailerService,
          useClass: contactStub,
        },
      ],
    }).compile();

    service = module.get<ContactApiService>(ContactApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
