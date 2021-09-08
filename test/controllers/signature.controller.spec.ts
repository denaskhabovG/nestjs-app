import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserSignatureController } from '../../src/userSignature/userSignature.controller';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { UserSignatureModule } from '../../src/userSignature/userSignature.module';
import { UserSignature } from '../../src/userSignature/models/userSignature.model';
import * as signatureJson from '../../src/userSignature/signatures/signature.json';
import { EncryptSignatureService } from '../../src/userSignature/encryptSignature.service';

const mockedSignature = {
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
  });

  beforeEach(async () => {
    const signature = new UserSignature();
    const stringifiedJson = JSON.stringify(signatureJson);

    signature.text = EncryptSignatureService.encrypt(stringifiedJson, 'secret');

    await signature.save();
  });

  afterEach(async () => {
    await UserSignature.destroy({ where: {} });
  });

  it('should get signature', async () => {
    const response = await request(app.getHttpServer())
      .get('/signature');

    expect(response.body).toEqual(signatureJson);
  });

  it('should signIn', async () => {
    const response1 = await request(app.getHttpServer())
      .get('/signature');

    const response2 = await request(app.getHttpServer())
      .post('/signature')
      .send(signatureJson)
      .set('Set-Cookie', `session-id=${response1.body.text}`);

    console.log(response2.body.text);
    console.log(response1.body.text);

    expect(response2.body.text).toEqual(response1.body.text);
  });
});
