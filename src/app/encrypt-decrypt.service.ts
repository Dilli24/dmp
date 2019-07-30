import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as config from '../config/config.json'
import { Config } from 'node_modules1/codelyzer/index.js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  encryptData(value) {

    try {
         var enc_string = CryptoJS.AES.encrypt(JSON.stringify(value),config.secretkey).toString();
         console.log(enc_string);
      return  enc_string;
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(value) {

    try {
      const bytes = CryptoJS.AES.decrypt(value, config.secretkey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return value;
    } catch (e) {
      console.log(e);
    }
  }



}
