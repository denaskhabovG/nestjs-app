import * as CryptoJS from 'crypto-js';

export class EncryptSignatureService {
  static encrypt(message = '', key = '') {
    const msg = CryptoJS.AES.encrypt(message, key);
    return msg.toString();
  }

  static decrypt(message = '', key = '') {
    const code = CryptoJS.AES.decrypt(message, key);
    return code.toString(CryptoJS.enc.Utf8);
  }
}
