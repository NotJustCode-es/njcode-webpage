import { Test, TestingModule } from '@nestjs/testing';
import { contactStub } from '@server/shared/testing/stub/contact.stub';
import { MailerService } from '@nestjs-modules/mailer';
import { MailParams } from '@server/models/mail-params';
import { getRecaptchaTestingModule } from '@server/shared/testing/recaptcha-testing.module';
import { ContactApiService } from '@server/contact-api/contact-api.service';
import { ContactApiController } from '@server/contact-api/contact-api.controller';

describe('ContactController', () => {
  let controller: ContactApiController;
  let service: ContactApiService;

  const mailParams = {
    name: 'test',
    email: 'test@test.com',
    message: 'test',
  } as MailParams;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactApiController],
      providers: [
        {
          provide: MailerService,
          useClass: contactStub,
        },
        ContactApiService,
      ],
      imports: [
        getRecaptchaTestingModule(),
      ],
    }).compile();

    controller = module.get<ContactApiController>(ContactApiController);
    service = module.get<ContactApiService>(ContactApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service sendEmail', async () => {
    const serviceSpy = jest.spyOn(service, 'sendEmail');
    controller.sendMail(mailParams);
    expect(serviceSpy).toHaveBeenCalledWith(mailParams);
  });
});
