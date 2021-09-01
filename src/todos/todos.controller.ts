import { Controller, Delete, Get, Param, Post, Put, Patch, Body } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {

  @Get()
  getAllTodos():string {
    return 'all todos';
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string): string {
    return 'one todo ' + id;
  }

  @Post()
  createTodo(@Body() createTodo: CreateTodoDto): string {
    return `Title: ${createTodo.title} done: ${createTodo.done}`;
  }

  @Delete('id')
  deleteTodo(@Param('id') id: string) {
    return 'Delete todo ' + id;
  }

  @Put('id')
  updateTodo(@Body() updateTodo: UpdateTodoDto, @Param('id') id: string) {
    return 'Update ' + id;
  }

  @Patch()
  changeTodo(@Body() updateTodo: UpdateTodoDto, @Param('id') id: string) {
    return 'Change ' + id;
  }
}
