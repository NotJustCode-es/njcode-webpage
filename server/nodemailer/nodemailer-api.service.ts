import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { GoogleRecaptchaException, GoogleRecaptchaValidator } from '@nestlab/google-recaptcha';
import { MailParams } from '../models/mail-params';

@Injectable()
export class NodemailerApiService {
  constructor(
    @Inject(MailerService) private mailerService: MailerService,
    @Inject(GoogleRecaptchaValidator) private readonly recaptchaValidator: GoogleRecaptchaValidator,
  ) {}

  async sendEmail(params: MailParams, recaptchaToken: string): Promise<string> {
    const result = await this.recaptchaValidator.validate({
      response: recaptchaToken,
    });

    if (!result.success) {
      throw new GoogleRecaptchaException(result.errors);
    }

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
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
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
