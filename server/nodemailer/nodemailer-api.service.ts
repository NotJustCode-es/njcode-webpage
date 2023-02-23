import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { MailParams } from '../models/mail-params';

@Injectable()
export class NodemailerApiService {
  constructor(@Inject(MailerService) private mailerService: MailerService) {}

  async sendEmail(params: MailParams): Promise<string> {
    const { name } = params;
    const { email } = params;
    const { message } = params;

    await this.mailerService.sendMail({
      to: process.env['MAIL_TO'],
      template: './contact',
      context: {
        name,
        email,
        message,
      },
    });
    return 'funciona';
  }
}
