import { IsEmail, IsNotEmpty } from 'class-validator';

export class MailParams {
  @IsNotEmpty()
    name!: string;

  @IsEmail()
    email!: string;

  @IsNotEmpty()
    message!: string;
}
