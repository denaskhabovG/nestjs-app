import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enumConfig';
import { pgConfig } from './postgres.config';
import { Dialect } from 'sequelize';

export interface IDatabaseConfig {
  pg: {
    dialect: Dialect,
    logging: boolean,
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    autoLoadEntities: boolean,
    synchronize: boolean,
  };
}

export const databaseConfig = registerAs(EnumConfig.DATABASE, (): IDatabaseConfig => ({
  pg: {
    dialect: <Dialect>process.env.SQL_DIALECT || 'postgres',
    logging: process.env.SQL_LOGGING === 'true' || true,
    ...pgConfig()
  },
}));
