import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSignature } from './models/userSignature.model';
import { SignInDto } from './dto/create-signature.dto';
import * as signatureJson from './signatures/signature.json';
import { Session } from '../session/models/session.model';
import { EncryptSignatureService } from './encryptSignature.service';

@Injectable()
export class UserSignatureService {
  constructor(
    @InjectModel(UserSignature)
    private UserSignatureModel: typeof UserSignature,
  ) {
  }

  async getSignature(): Promise<object> {
    const signature = new UserSignature();
    const stringifiedJson = JSON.stringify(signatureJson);
    signature.text = EncryptSignatureService.encrypt(stringifiedJson, 'secret');
    await signature.save();

    return signatureJson;
  }

  async signIn(body: SignInDto): Promise<UserSignature>  {
    try {
      const signature1 = body.text;
      const signature2 = await this.UserSignatureModel.findOne({
        where: {
          text: body.text,
        },
      });

      const decryptedSignature1 = EncryptSignatureService.decrypt(signature1, 'secret');
      const decryptedSignature2 = EncryptSignatureService.decrypt(signature2.text, 'secret');

      if (decryptedSignature1 === decryptedSignature2) {
        const session = new Session();
        session.text = signature1;
        return session.save();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
