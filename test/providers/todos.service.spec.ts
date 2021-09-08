import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { INestApplication } from '@nestjs/common';
import { TodoModule } from '../../src/todos/todo.module';
import { TodoService } from '../../src/todos/todo.service';
import { Todo } from '../../src/todos/models/todo.model';

const mockedTodo = {
  title: 'title',
  done: false,
};

describe('TodoService', () => {
  let app: INestApplication;
  let todoService: TodoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        TodoModule,
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const todo = new Todo();

    todo.title = mockedTodo.title;
    todo.done = mockedTodo.done;

    return todo.save();
  });

  afterEach(async () => {
    await Todo.destroy({ where: {} });
  });

  it('should get all todos', async () => {
    const todos = await todoService.findAll();

    todos.forEach(todo => {
      expect(todo.title).toEqual(mockedTodo.title);
      expect(todo.done).toEqual(mockedTodo.done);
    });
  });

  it('should create todo', async () => {
    const todo = await todoService.create(mockedTodo);

    expect(todo.title).toEqual(mockedTodo.title);
    expect(todo.done).toEqual(mockedTodo.done);
  });

  it('should update todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } });
    const editTodo = { title: 'something', done: true };
    const freshTodo = await todoService.update(todo.id, editTodo);

    freshTodo[1].forEach(todo => {
      expect(todo.title).toEqual(editTodo.title);
      expect(todo.done).toEqual(editTodo.done);
    });
  });

  it('should delete todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } });
    await todoService.remove(todo.id);

    const freshTodo = await Todo.findOne({ where: { title: mockedTodo.title } });

    expect(freshTodo).toBeNull();
  });
});
