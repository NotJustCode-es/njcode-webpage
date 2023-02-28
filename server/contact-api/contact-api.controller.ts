import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Recaptcha, RecaptchaResult, RecaptchaVerificationResult } from '@nestlab/google-recaptcha';
import { ContactApiService } from './contact-api.service';
import { MailParams } from '../models/mail-params';

@Controller('contact')
export class ContactApiController {
  constructor(
    @Inject(ContactApiService)private readonly contactService: ContactApiService,
  ) {}

  @Recaptcha()
  @Post('/send')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMail(
    @Body() params: MailParams,
      @RecaptchaResult() recaptchaResult: RecaptchaVerificationResult,
  ): Promise<void> {
    if (recaptchaResult.success) {
      this.contactService.sendEmail(params);
    }
  }
}
