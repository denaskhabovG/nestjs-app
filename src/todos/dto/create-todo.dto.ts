import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly done: boolean;
}
