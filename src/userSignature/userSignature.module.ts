import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSignature } from './models/userSignature.model';
import { UserSignatureService } from './userSignature.service';
import { UserSignatureController } from './userSignature.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserSignature])],
  providers: [UserSignatureService],
  controllers: [UserSignatureController],
})

export class UserSignatureModule {}
