import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
  selector: 'tbh-read-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './read-modal.component.html',
  styleUrls: ['./read-modal.component.scss'],
})
export class ReadModalComponent {
  @Input()
  onClose = () => {};

  readForm = new FormGroup({
    tweetId: new FormControl<string>('', Validators.required),
  });

  constructor(private twitterService: TwitterService) {}

  async readFormSubmit() {
    const id = this.readForm.controls.tweetId.value;
    if (id) {
      await this.twitterService.searchTweet(id);
    }
  }
}
