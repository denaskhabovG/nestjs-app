import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from '../../src/config/sequelizeConfig.service';
import { databaseConfig } from '../../src/config/configuration';
import { UserSignatureModule } from '../../src/userSignature/userSignature.module';
import { UserSignatureService } from '../../src/userSignature/userSignature.service';
import { UserSignature } from '../../src/userSignature/models/userSignature.model';
import * as signatureJson from '../../src/userSignature/signatures/signature.json';
import { EncryptSignatureService } from '../../src/userSignature/encryptSignature.service';

describe('UserSignatureService', () => {
  let app: INestApplication;
  let userSignatureService: UserSignatureService;

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
        UserSignatureModule,
      ],
    }).compile();

    userSignatureService = module.get<UserSignatureService>(UserSignatureService);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await UserSignature.destroy({ where: {} });
  });

  it('should get signature', async () => {
    const signature = await userSignatureService.getSignature();

    console.log(signature);

    expect(signature).toEqual(signatureJson);
  });

  it('should signIn', async () => {
    const mockedSignatureValue = 'mockedsignature';
    const spy = jest.spyOn(EncryptSignatureService, 'encrypt').mockImplementation(() => mockedSignatureValue);

    await userSignatureService.getSignature();
    const signature = await userSignatureService.signIn({text: mockedSignatureValue});

    expect(signature.getDataValue('text')).toBe(mockedSignatureValue);

    spy.mockRestore();
  });
});
