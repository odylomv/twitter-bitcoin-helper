import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
    selector: 'tbh-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    image: any;

    hideForm = new FormGroup({
        tweetSecret: new FormControl('', Validators.required),
        tweetImage: new FormControl(null, Validators.required),
        tweetImageSource: new FormControl<File | null>(null, Validators.required),
    });

    constructor(private twitterService: TwitterService) {}

    async onSubmit() {
        console.log(this.hideForm);
        if (this.hideForm.controls.tweetSecret.value && this.hideForm.controls.tweetImageSource.value) {
            this.twitterService.postTweet(
                this.hideForm.controls.tweetSecret.value,
                this.hideForm.controls.tweetImageSource.value
            );
        }
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.hideForm.patchValue({
                tweetImageSource: file,
            });
        }
    }

    showPreview() {
        if (this.hideForm.controls.tweetImageSource.value) {
            let reader = new FileReader();
            reader.onload = e => (this.image = e.target?.result);
            reader.readAsDataURL(this.hideForm.controls.tweetImageSource.value);
        }
    }
}
