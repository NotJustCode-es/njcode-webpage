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
    // eslint-disable-next-line no-console
    console.log('name on service call: ', params.name);
    // eslint-disable-next-line no-console
    console.log('email on service call: ', params.email);
    // eslint-disable-next-line no-console
    console.log('message on service call: ', params.message);

    await this.mailerService.sendMail({
      to: process.env['MAIL_TO'],
      template: './contact', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name,
        email,
        message,
      },
    });
    return 'funciona';
  }
}
