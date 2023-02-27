import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  Headers,
  ValidationPipe,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { ContactApiService } from './contact-api.service';
import { MailParams } from '../models/mail-params';

@Recaptcha()
@Controller('contact')
export class ContactApiController {
  constructor(
    @Inject(ContactApiService)private readonly mailService: ContactApiService,
  ) {}

  @Post('/send')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendMail(
    @Body() params: MailParams,
      @Headers('recaptcha') token: string,
  ): Promise<void> {
    this.mailService.sendEmail(params, token);
  }
}
