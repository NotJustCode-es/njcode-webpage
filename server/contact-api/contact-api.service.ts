import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { MailParams } from '@server/models/mail-params';

@Injectable()
export class ContactApiService {
  constructor(
    @Inject(MailerService) private mailerService: MailerService,
  ) {}

  async sendEmail(params: MailParams): Promise<void> {
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
  }
}
