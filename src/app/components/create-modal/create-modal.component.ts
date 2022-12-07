import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbh-create-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
  @Input()
  onClose = () => {};
}
