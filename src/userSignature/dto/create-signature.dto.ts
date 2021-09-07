import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  readonly text: string;
}
