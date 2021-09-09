import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from '../../src/todos/todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { TodoModule } from '../../src/todos/todo.module';
import { Todo } from '../../src/todos/models/todo.model';

const mockedTodo = {
  title: 'title',
  done: false,
};

describe('TodosController', () => {
  let app: INestApplication;

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
      TodoModule
      ],
    }).compile();

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

  it('should create todo', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send(mockedTodo);

    expect(response.body.title).toBe(mockedTodo.title);
    expect(response.body.done).toBe(mockedTodo.done);
  });

  it('should get all todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos');

    response.body.forEach(todo => {
      expect(todo.title).toEqual(mockedTodo.title);
      expect(todo.done).toEqual(mockedTodo.done);
    });
  });

  it('should update todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } });
    const editTodo = { title: 'something', done: true };

    const response = await request(app.getHttpServer())
      .patch(`/todos/${todo.id}`)
      .send(editTodo);

    response.body[1].forEach(todo => {
      expect(todo.title).toEqual(editTodo.title);
      expect(todo.done).toEqual(editTodo.done);
    });
  });

  it('should delete todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } });

    await request(app.getHttpServer())
      .delete(`/todos/${todo.id}`);

    const freshTodo = await Todo.findOne({ where: { title: mockedTodo.title } });

    expect(freshTodo).toBeNull();
  });
});
