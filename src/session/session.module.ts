import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Session } from './models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Session]),
    ConfigModule
  ],
})

export class SessionModule {}
