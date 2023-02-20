import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailParams } from '../../models/mail-params';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(params: MailParams): Promise<string> {
    const url = `example.com/auth/confirm?token=${params.token}`;
    const { name } = params;
    // eslint-disable-next-line no-console
    console.log('name on service call: ', params.name);
    // eslint-disable-next-line no-console
    console.log('email on service call: ', params.email);
    // eslint-disable-next-line no-console
    console.log('token on service call: ', params.token);

    await this.mailerService.sendMail({
      to: params.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name,
        url,
      },
    });
    return 'funciona';
  }
}
