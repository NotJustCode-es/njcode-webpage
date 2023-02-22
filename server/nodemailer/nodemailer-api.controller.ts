import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';
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
  ): Promise<string> {
    // eslint-disable-next-line no-console
    console.log('Params on controller call: ', params);
    // eslint-disable-next-line no-console
    console.log('token on controller call: ', token);

    return this.mailService.sendEmail(params, token);
  }
}
