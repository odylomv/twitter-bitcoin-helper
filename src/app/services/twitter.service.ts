import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TwitterService {
    private token: TwitterAccessToken | undefined;

    constructor(private http: HttpClient) {}

    async authorize() {
        sessionStorage.removeItem('access_token');
        const url = await lastValueFrom(this.http.get<string>(environment.twitterCallback + '/twitter_auth'));
        window.location.href = url;
    }

    async token_expired() {
        return this.token === undefined || Date.now() / 1000 >= this.token.expires_at;
    }

    async get_access_token() {
        if (this.token === undefined) {
            const token_string = sessionStorage.getItem('access_token');

            if (token_string != null) {
                this.token = JSON.parse(token_string) as TwitterAccessToken;

                const expired = await this.token_expired();
                if (!expired) {
                    return this.token;
                }
            }

            const postUrl = environment.twitterCallback + '/twitter_token';
            this.token = await lastValueFrom(
                this.http.post<TwitterAccessToken>(postUrl, { url: window.location.href })
            );

            sessionStorage.setItem('access_token', JSON.stringify(this.token));
        }
        return this.token;
    }
}

interface TwitterAccessToken {
    access_token: string;
    expires_at: number;
    expires_in: number;
    scope: Array<string>;
    token_type: string;
}
