import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailParams } from '../../models/mail-params';

@Controller('mail')
export class MailController {
  constructor(
    @Inject(MailService)private readonly mailService: MailService,
  ) {}

  @Post('/send')
  async sendMail(
    @Body() params: MailParams,
  ): Promise<string> {
    // eslint-disable-next-line no-console
    console.log('Params on controller call: ', params);

    return this.mailService.sendEmail(params);
  }
}
