import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tbh-read-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-modal.component.html',
  styleUrls: ['./read-modal.component.scss'],
})
export class ReadModalComponent {
  @Input()
  onClose = () => {};
}
