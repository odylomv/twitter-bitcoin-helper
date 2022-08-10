import { Component } from '@angular/core';
import { TwitterService } from './services/twitter.service';

@Component({
    selector: 'tbh-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'twitter-bitcoin-helper';

    constructor(private twitterService: TwitterService) {}

    twitterLogin() {
        this.twitterService.authorize();
    }

    async auth_response() {
        const access_token = await this.twitterService.get_access_token();
        console.log(access_token);
    }

    async test() {
        console.log(await this.twitterService.token_expired());
    }
}
