import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize/types';

export interface IDatabaseConfig {
  pg: {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    logging: boolean;
  };
}

export const databaseConfig = registerAs('database', (): IDatabaseConfig => ({
  pg: {
    dialect: <Dialect>process.env.SQL_DIALECT || 'postgres',
    logging: process.env.SQL_LOGGING === 'true' || true,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
  },
}));
