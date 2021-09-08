import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enumConfig';
import { pgConfig } from './postgres.config';

export interface IDatabaseConfig {
  pg: {
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
    ...pgConfig()
  },
}));
