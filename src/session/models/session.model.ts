import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Session extends Model {
  @Column
  text: string;
}
