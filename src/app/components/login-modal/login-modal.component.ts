import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
  selector: 'tbh-login-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  @Input()
  onClose = () => {};

  constructor(public twitterService: TwitterService) {}
}
