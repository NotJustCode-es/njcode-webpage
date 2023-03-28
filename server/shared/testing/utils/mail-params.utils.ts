import { MailParams } from '@server/models/mail-params';

export function mailParams(): MailParams {
  const response = {
    name: 'test',
    email: 'test@test.com',
    message: 'test',
  };
  return response;
}
