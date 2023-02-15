import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(6)
  readonly password: string;
}
