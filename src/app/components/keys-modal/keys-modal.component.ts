import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbh-keys-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keys-modal.component.html',
  styleUrls: ['./keys-modal.component.scss'],
})
export class KeysModalComponent {
  @Input()
  onClose = () => {};
  @Input()
  privKey = '';
  @Input()
  pubKey = '';
}
