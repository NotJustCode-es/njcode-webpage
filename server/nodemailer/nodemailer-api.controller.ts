import {
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { NodemailerApiService } from './nodemailer-api.service';
import { MailParams } from '../models/mail-params';

@Controller('mail')
export class NodemailerApiController {
  constructor(
    @Inject(NodemailerApiService)private readonly mailService: NodemailerApiService,
  ) {}

  @Post('/send')
  async sendMail(
    @Body() params: MailParams,

  ): Promise<string> {
    return this.mailService.sendEmail(params);
  }
}
