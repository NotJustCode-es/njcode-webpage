import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DynamicModule } from '@nestjs/common';

export function getContactTestingModule(): DynamicModule {
  return MailerModule.forRoot({
    transport: {
      host: 'test',
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'test',
        pass: 'test',
      },
    },
    defaults: {
      from: 'test',
      subject: 'test',
    },
    template: {
      dir: 'test',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  });
}
