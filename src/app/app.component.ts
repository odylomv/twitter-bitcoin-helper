import { Component } from '@angular/core';
import { TwitterService } from './services/twitter.service';

@Component({
    selector: 'tbh-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private twitterService: TwitterService) {}

    twitterLogin() {
        this.twitterService.authorize();
    }

    getAuthStatus() {
        return this.twitterService.authStatus();
    }
}
