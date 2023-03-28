import { Test, TestingModule } from '@nestjs/testing';
import { contactStub } from '@server/shared/testing/stub/contact.stub';
import { MailerService } from '@nestjs-modules/mailer';
import { mailParams } from '../shared/testing/utils/mail-params.utils';
import { getRecaptchaTestingModule } from '../shared/testing/recaptcha-testing.module';
import { ContactApiService } from './contact-api.service';
import { ContactApiController } from './contact-api.controller';

describe('ContactController', () => {
  let controller: ContactApiController;
  let service: ContactApiService;

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
    controller.sendMail(mailParams());
    expect(serviceSpy).toHaveBeenCalledWith(mailParams());
  });
});
