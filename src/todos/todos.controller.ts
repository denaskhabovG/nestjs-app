import { Controller, Delete, Get, Param, Post, Patch, Body, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { ChangeTodoDto } from './dto/change-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createTodo(@Body() createTodo: CreateTodoDto) {
    return this.todoService.create(createTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  @Patch(':id')
  changeTodo(@Body() updateTodo: ChangeTodoDto, @Param('id') id: string) {
    return this.todoService.update(id, updateTodo);
  }
}
