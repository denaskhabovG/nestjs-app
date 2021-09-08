import { IsNotEmpty } from 'class-validator';

export class SignatureDto {
  @IsNotEmpty()
  readonly text: string;
}
