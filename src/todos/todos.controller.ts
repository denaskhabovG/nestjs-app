import { Controller, Delete, Get, Param, Post, Put, Patch, Body, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

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

  @Delete('id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  @Patch()
  changeTodo(@Body() updateTodo: UpdateTodoDto, @Param('id') id: string) {
    return this.todoService.update(id, updateTodo);
  }
}
