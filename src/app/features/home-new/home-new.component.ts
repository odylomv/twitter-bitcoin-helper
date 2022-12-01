import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
  selector: 'tbh-home-new',
  standalone: true,
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.scss'],
  imports: [CommonModule, LoginModalComponent],
})
export class HomeNewComponent {
  loginModalOpen = false;

  setLoginModal = (open: boolean) => {
    console.log('test');
    this.loginModalOpen = open;
  };

  closeLoginModal = () => this.setLoginModal(false);
}
