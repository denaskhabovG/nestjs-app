import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/configuration';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { TodoModule } from './todos/todo.module';
import { UserSignatureModule } from './userSignature/userSignature.module';
import { EventsModule } from './socket/socket.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TodoModule,
    UserSignatureModule,
    EventsModule
  ],
})

export class AppModule {}
