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

  beforeEach(async () => {
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

  it('should create todo', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send(mockedTodo);

    expect(response.body.title).toBe(mockedTodo.title);
    expect(response.body.done).toBe(mockedTodo.done);
  });

  it('should get all todos', async () => {
    const todo = await Todo.findOne();
    const response = await request(app.getHttpServer())
      .get('/todos');

    expect(todo.title).toBe(mockedTodo.title);
    expect(todo.done).toBe(mockedTodo.done);
  });

  it('should update todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } })

    await request(app.getHttpServer())
      .patch(`/todos/${todo.id}`)
      .send(mockedTodo);

    expect(todo.title).toEqual(mockedTodo.title);
    expect(todo.done).toEqual(mockedTodo.done);
  });

  it('should delete todo', async () => {
    const todo = await Todo.findOne({ where: { title: mockedTodo.title } })

    await request(app.getHttpServer())
      .delete(`/todos/${todo.id}`);
  });
});
