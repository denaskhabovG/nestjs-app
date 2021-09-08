import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enumConfig';

export const pgConfig = registerAs(EnumConfig.DATABASE, () => {
  const isTestEnv = process.env.NODE_ENV === 'test';

  return {
    host: isTestEnv
      ? process.env.DATABASE_TEST_HOST
      : process.env.DATABASE_HOST,
    port: isTestEnv
      ? +process.env.DATABASE_TEST_PORT
      : +process.env.DATABASE_PORT,
    username: isTestEnv
      ? process.env.DATABASE_TEST_USER
      : process.env.DATABASE_USER,
    password: isTestEnv
      ? process.env.DATABASE_TEST_PASSWORD
      : process.env.DATABASE_PASSWORD,
    database: isTestEnv
      ? process.env.DATABASE_TEST_NAME
      : process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  };
});
