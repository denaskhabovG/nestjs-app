import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserSignature extends Model {
  @Column
  text: string;
}
