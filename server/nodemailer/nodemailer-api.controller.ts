import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
} from '@nestjs/common';
import { Recaptcha, RecaptchaResult, RecaptchaVerificationResult } from '@nestlab/google-recaptcha';
import { NodemailerApiService } from './nodemailer-api.service';
import { MailParams } from '../models/mail-params';

@Controller('mail')
export class NodemailerApiController {
  constructor(
    @Inject(NodemailerApiService)private readonly mailService: NodemailerApiService,
  ) {}

  @Recaptcha()
  @Post('/send')
  async sendMail(
    @Body() params: MailParams,
      @Headers('recaptcha') token: string,
      @RecaptchaResult() recaptchaResult: RecaptchaVerificationResult,
  ): Promise<string> {
    // eslint-disable-next-line no-console
    console.log(` ${recaptchaResult.success} ${recaptchaResult.errors}`);
    return this.mailService.sendEmail(params, token);
  }
}
