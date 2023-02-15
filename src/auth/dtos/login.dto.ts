import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(6)
  readonly password: string;
}
