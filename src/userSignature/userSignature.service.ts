import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as CryptoJS from 'crypto-js';
import { UserSignature } from './models/userSignature.model';
import { SignInDto } from './dto/create-signature.dto';
import * as signatureJson from './signatures/signature.json';
import { Session } from '../session/models/session.model';

@Injectable()
export class UserSignatureService {
  constructor(
    @InjectModel(UserSignature)
    private UserSignatureModel: typeof UserSignature,
  ) {
  }

  encrypt(message = '', key = '') {
    const msg = CryptoJS.AES.encrypt(message, key);
    return msg.toString();
  }

  decrypt(message = '', key = '') {
    const code = CryptoJS.AES.decrypt(message, key);
    return code.toString(CryptoJS.enc.Utf8);
  }

  async getSignature(): Promise<object> {
    const signature = new UserSignature();
    const stringifiedJson = JSON.stringify(signatureJson);
    signature.text = this.encrypt(stringifiedJson, 'secret');
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

      const decryptedSignature1 = this.decrypt(signature1, 'secret');
      const decryptedLastSignature = this.decrypt(signature2.text, 'secret');

      if (decryptedSignature1 === decryptedLastSignature) {
        const session = new Session();
        session.text = signature1;
        return session.save();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number): Promise<void> {
    const signature = await this.UserSignatureModel.findOne({
      where: {
        id,
      },
    });

    await signature.destroy();
  }
}
