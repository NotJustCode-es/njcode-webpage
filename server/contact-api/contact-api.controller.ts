import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  Headers,
  ValidationPipe,
} from '@nestjs/common';
import { Recaptcha, RecaptchaResult, RecaptchaVerificationResult } from '@nestlab/google-recaptcha';
import { ContactApiService } from './contact-api.service';
import { MailParams } from '../models/mail-params';

@Controller('contact')
export class ContactApiController {
  constructor(
    @Inject(ContactApiService)private readonly mailService: ContactApiService,
  ) {}

  @Recaptcha()
  @Post('/send')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMail(
    @Body() params: MailParams,
      @Headers('recaptcha') token: string,
      @RecaptchaResult() recaptchaResult: RecaptchaVerificationResult,
  ): Promise<void> {
     // eslint-disable-next-line no-console
     console.log(` ${recaptchaResult.success} ${recaptchaResult.errors}`);
    this.mailService.sendEmail(params, token);
  }
}
