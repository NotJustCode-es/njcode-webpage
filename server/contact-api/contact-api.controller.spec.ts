import { Test, TestingModule } from '@nestjs/testing';
import { getContactTestingModule } from '@server/shared/testing/contact-testing.module';
import { getRecaptchaTestingModule } from '../shared/testing/recaptcha-testing.module';
import { ContactApiService } from './contact-api.service';
import { ContactApiController } from './contact-api.controller';

describe('ContactController', () => {
  let controller: ContactApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactApiController],
      providers: [ContactApiService],
      imports: [
        getRecaptchaTestingModule(),
        getContactTestingModule(),
      ],
    }).compile();

    controller = module.get<ContactApiController>(ContactApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
