import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { IDatabaseConfig } from './configuration';
import { Todo } from '../todos/models/todo.model';
import { Session } from '../session/models/session.model';
import { UserSignature } from '../userSignature/models/userSignature.model';
import { EnumConfig } from './enumConfig/enumConfig';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      pg: { dialect, host, port, username, password, database, logging },
    } = this.configService.get<IDatabaseConfig>(EnumConfig.DATABASE);

    return {
      dialect,
      host,
      port,
      username,
      password,
      database,
      logging,
      models: [Todo, Session, UserSignature],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
