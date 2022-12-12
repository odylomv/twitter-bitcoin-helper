import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter.service';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { ReadModalComponent } from '../../components/read-modal/read-modal.component';

@Component({
  selector: 'tbh-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, LoginModalComponent, CreateModalComponent, ReadModalComponent],
})
export class HomeComponent {
  authStatus: boolean = false;

  loginModalOpen = false;
  createModalOpen = false;
  readModalOpen = false;

  constructor(public twitterService: TwitterService) {
    twitterService.authStatus().subscribe(isAuthed => {
      this.authStatus = isAuthed;
    });
  }

  setLoginModal = (open: boolean) => {
    console.log('test');
    this.loginModalOpen = open;
  };

  closeLoginModal = () => this.setLoginModal(false);

  setCreateModal = (open: boolean) => {
    if (!this.authStatus) return this.setLoginModal(true);

    console.log('create');
    this.createModalOpen = open;
  };

  closeCreateModal = () => this.setCreateModal(false);

  setReadModal = (open: boolean) => {
    if (!this.authStatus) return this.setLoginModal(true);

    console.log('read');
    this.readModalOpen = open;
  };

  closeReadModal = () => this.setReadModal(false);
}
