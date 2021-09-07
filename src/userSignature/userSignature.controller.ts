import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserSignatureService } from './userSignature.service';
import { SignInDto } from './dto/create-signature.dto';

@Controller('signature')
export class UserSignatureController {
  constructor(private readonly userSignatureService: UserSignatureService) {}

  @Get()
  getSignature(): Promise<object> {
    return this.userSignatureService.getSignature();
  }

  @Post()
  signIn(@Body() signature: SignInDto) {
    return this.userSignatureService.signIn(signature);
  }
}