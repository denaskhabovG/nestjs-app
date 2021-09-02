import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';
import { TodosController } from './todos.controller';


@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodosController],
})
export class UsersModule {}
