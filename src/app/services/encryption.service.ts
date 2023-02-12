import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  lastKeys: CryptoKeyPair | null = null;
  constructor() {}

  // Used to convert the decrypted cipher to a readable string
  bufferToString(buffer: ArrayBuffer) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)));
  }

  bufferToHex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#examples
  stringToBuffer(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // Export key pair using PEM format
  async keysToPemString(keys: CryptoKeyPair) {
    return {
      publicKey: `-----BEGIN PUBLIC KEY-----\n${window.btoa(
        this.bufferToString(await window.crypto.subtle.exportKey('spki', keys.publicKey))
      )}\n-----END PUBLIC KEY-----`,
      privateKey: `-----BEGIN RSA PRIVATE KEY-----\n${window.btoa(
        this.bufferToString(await window.crypto.subtle.exportKey('pkcs8', keys.privateKey))
      )}\n-----END RSA PRIVATE KEY-----`,
    };
  }

  async generateKeys() {
    let keys = await window.crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256', // Use SHA256 hash to calculate signatures
      },
      true,
      ['sign', 'verify']
    );
    this.lastKeys = keys;
    return keys;
  }

  async importSigningKey(key: string) {
    const pemHeader = '-----BEGIN RSA PRIVATE KEY-----';
    const pemFooter = '-----END RSA PRIVATE KEY-----';
    const pemContents = key.substring(pemHeader.length, key.length - pemFooter.length);

    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = this.stringToBuffer(binaryDerString);

    return await window.crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256', // Use SHA256 hash to calculate signatures
      },
      true,
      ['sign']
    );
  }

  async hash(message: string) {
    const encodedMessage = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedMessage);
    return hashBuffer;
  }

  async signMessage(key: CryptoKey, text: string) {
    const hash = await this.hash(text);
    const encodedText = new TextEncoder().encode(text);
    const signature = await window.crypto.subtle.sign({ name: 'RSASSA-PKCS1-v1_5' }, key, encodedText);

    return { hash, signature };
  }

  async verifyMessage(key: CryptoKey, signature: ArrayBuffer, message: ArrayBuffer) {
    return await window.crypto.subtle.verify({ name: 'RSASSA-PKCS1-v1_5' }, key, signature, message);
  }
}
