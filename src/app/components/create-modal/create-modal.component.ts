import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
  selector: 'tbh-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
  @Input()
  onClose = () => {};

  createForm = new FormGroup({
    tweetSecret: new FormControl('', Validators.required),
    privateKey: new FormControl('', Validators.required),
    imageMethod: new FormControl<'cat' | 'local'>('cat', Validators.required),
    tweetImage: new FormControl(null),
    tweetImageSource: new FormControl<File | null>(null),
    blockchain: new FormControl<'main' | 'test'>('test', Validators.required),
  });

  constructor(private twitterService: TwitterService) {}

  async createFormSubmit() {
    console.log(this.createForm);
    if (
      this.createForm.controls.tweetSecret.value &&
      this.createForm.controls.privateKey.value &&
      (this.createForm.controls.imageMethod.value || this.createForm.controls.tweetImageSource.value)
    ) {
      await this.twitterService.postTweet(
        this.createForm.controls.tweetSecret.value,
        this.createForm.controls.privateKey.value,
        this.createForm.controls.imageMethod.value ?? 'cat',
        this.createForm.controls.tweetImageSource.value,
        this.createForm.controls.blockchain.value ?? 'test'
      );
    }

    this.onClose();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createForm.patchValue({
        tweetImageSource: file,
      });
    }
  }
}
