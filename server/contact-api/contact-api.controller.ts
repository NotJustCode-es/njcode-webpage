import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';
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
  ): Promise<void> {
    this.contactService.sendEmail(params);
  }
}
