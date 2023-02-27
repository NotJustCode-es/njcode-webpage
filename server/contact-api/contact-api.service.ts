import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { GoogleRecaptchaException, GoogleRecaptchaValidator } from '@nestlab/google-recaptcha';
import { MailParams } from '../models/mail-params';

@Injectable()
export class ContactApiService {
  constructor(
    @Inject(MailerService) private mailerService: MailerService,
    @Inject(GoogleRecaptchaValidator) private readonly recaptchaValidator: GoogleRecaptchaValidator,
  ) {}

  async sendEmail(params: MailParams, recaptchaToken: string): Promise<void> {
    const result = await this.recaptchaValidator.validate({
      response: recaptchaToken,
      score: 0.8,
      action: 'sendMail',
    });

    if (!result.success) {
      throw new GoogleRecaptchaException(result.errors);
    }
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
