import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NodemailerApiService } from './nodemailer-api.service';
import { MailParams } from '../models/mail-params';

@Controller('mail')
export class NodemailerApiController {
  constructor(
    @Inject(NodemailerApiService)private readonly mailService: NodemailerApiService,
  ) {}

  @Post('/send')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMail(
    @Body() params: MailParams,
  ): Promise<void> {
    this.mailService.sendEmail(params);
  }
}
