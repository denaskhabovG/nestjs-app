import { Test, TestingModule } from '@nestjs/testing';
import { UserSignatureController } from '../../dist/userSignature/userSignature.controller';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { UserSignatureModule } from '../../dist/userSignature/userSignature.module';
import * as request from 'supertest';

const mockedTodo = {
  text: 'signature',
};

describe('UserSignatureController', () => {
  let app: INestApplication;
  let session: string;

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
        UserSignatureModule
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    it('should get signature', async () => {
      const response = await request(app.getHttpServer())
        .get('/signature');

      expect(response).toEqual(mockedTodo);
    });

    it('should signIn', async () => {
      const response = await request(app.getHttpServer())
        .post('/signature')
        .send(mockedTodo)
        .set('Set-Cookie', `session-id=${session}`);

      expect(response).toEqual(mockedTodo);
    });
  });
});
