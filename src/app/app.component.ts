import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'twitter-bitcoin-helper';

    constructor(private http: HttpClient) {}

    twitterLogin() {
        this.http.get<string>(environment.twitterCallback).subscribe(url => {
            window.location.href = url;
        });
    }
}
