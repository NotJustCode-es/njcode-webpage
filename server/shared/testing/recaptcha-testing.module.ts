import { DynamicModule } from '@nestjs/common';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';

export function getRecaptchaTestingModule(): DynamicModule {
  return GoogleRecaptchaModule.forRoot({
    secretKey: '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
    response: (req: IncomingMessage):string => (req.headers['recaptcha'] || '').toString(),
    actions: ['sendMail'],
    score: 0.8,
  });
}
