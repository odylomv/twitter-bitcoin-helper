import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
    selector: 'tbh-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    image: any = null;

    hideForm = new FormGroup({
        tweetSecret: new FormControl('', Validators.required),
        imageMethod: new FormControl<'cat' | 'local'>('cat', Validators.required),
        tweetImage: new FormControl(null),
        tweetImageSource: new FormControl<File | null>(null),
    });

    constructor(private twitterService: TwitterService) {}

    async onSubmit() {
        console.log(this.hideForm);
        if (
            this.hideForm.controls.tweetSecret.value &&
            (this.hideForm.controls.imageMethod.value || this.hideForm.controls.tweetImageSource.value)
        ) {
            this.twitterService.postTweet(
                this.hideForm.controls.tweetSecret.value,
                this.hideForm.controls.imageMethod.value ?? 'cat',
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
        if (this.image !== null) this.image = null;
        else if (this.hideForm.controls.tweetImageSource.value) {
            let reader = new FileReader();
            reader.onload = e => (this.image = e.target?.result);
            reader.readAsDataURL(this.hideForm.controls.tweetImageSource.value);
        }
    }
}
