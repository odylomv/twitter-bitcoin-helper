import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KeysModalComponent } from 'src/app/components/keys-modal/keys-modal.component';
import { EncryptionService } from 'src/app/services/encryption.service';
import { TwitterService } from 'src/app/services/twitter.service';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { ReadModalComponent } from '../../components/read-modal/read-modal.component';

@Component({
  selector: 'tbh-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, LoginModalComponent, KeysModalComponent, CreateModalComponent, ReadModalComponent],
})
export class HomeComponent {
  authStatus: boolean = false;

  loginModalOpen = false;
  keysModalOpen = false;
  createModalOpen = false;
  readModalOpen = false;

  privKey = '';
  pubKey = '';

  constructor(public twitterService: TwitterService, private encService: EncryptionService) {
    twitterService.authStatus().subscribe(isAuthed => {
      this.authStatus = isAuthed;
    });
  }

  setLoginModal = (open: boolean) => {
    // console.log('test');
    this.loginModalOpen = open;
  };

  closeLoginModal = () => this.setLoginModal(false);

  setKeysModal = (open: boolean) => {
    // console.log('keys');
    this.keysModalOpen = open;
  };

  closeKeysModal = () => this.setKeysModal(false);

  setCreateModal = (open: boolean) => {
    if (!this.authStatus) return this.setLoginModal(true);

    // console.log('create');
    this.createModalOpen = open;
  };

  closeCreateModal = () => this.setCreateModal(false);

  setReadModal = (open: boolean) => {
    if (!this.authStatus) return this.setLoginModal(true);

    // console.log('read');
    this.readModalOpen = open;
  };

  closeReadModal = () => this.setReadModal(false);

  generateKeyPair = async () => {
    // const text = 'HEY THERE';
    // this.encService.generateKeys().then(keys => {
    //   this.encService.keysToPemString(keys).then(async ({ publicKey, privateKey }) => {
    //     console.log({ publicKey, privateKey });

    //     const msg = await this.encService.signMessage(keys.privateKey, text);
    //     console.log(this.encService.bufferToString(msg));
    //     const decrypted = await this.encService.verifyMessage(keys.publicKey, msg, new TextEncoder().encode(text));
    //     console.log(decrypted);
    //   });
    // });

    const keys = await this.encService.generateKeys();
    const { publicKey, privateKey } = await this.encService.keysToPemString(keys);
    console.log({ publicKey, privateKey });
    this.pubKey = publicKey;
    this.privKey = privateKey;
    await this.twitterService.sendPublicKey(publicKey);

    this.setKeysModal(true);
  };

  testVerify = async () => {
    const message = 'HELLO';
    const result = await this.twitterService.testVerify(message);
  };
}
