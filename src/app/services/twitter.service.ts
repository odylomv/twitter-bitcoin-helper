import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, retry, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TwitterService {
    private token: TwitterAccessToken | undefined = undefined;
    private lastTimer: Subscription | null = null;
    private authStatus$ = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
        // Check if the access token was previously saved in session storage
        const tokenString = sessionStorage.getItem('access_token');
        if (tokenString) this.updateToken(JSON.parse(tokenString));
    }

    private updateToken(token: TwitterAccessToken | undefined) {
        this.token = token;
        this.authStatus$.next(token !== undefined);

        // Clear old timer
        if (this.lastTimer) this.lastTimer.unsubscribe();
        this.lastTimer = null;

        // Automatically delete token when it expires
        if (this.token !== undefined) {
            // Store the subscription in case the token is updated before the previous one expires
            this.lastTimer = timer(this.token.expires_at * 1000 - Date.now()).subscribe(() => {
                sessionStorage.removeItem('access_token');
                this.updateToken(undefined);
            });
        }
    }

    authStatus = () => this.authStatus$.asObservable();

    async authorize() {
        // Clear previous access token if it exists
        sessionStorage.removeItem('access_token');
        // Redirect to Twitter
        window.location.href = await lastValueFrom(this.http.get<string>(environment.serverUrl + '/twitter_auth'));
    }

    logout() {
        this.updateToken(undefined);
        // Clear previous access token if it exists
        sessionStorage.removeItem('access_token');
    }

    async requestAccessToken() {
        if (this.token !== undefined) return; // Token exists

        const postUrl = environment.serverUrl + '/twitter_token';
        this.updateToken(
            await lastValueFrom(this.http.post<TwitterAccessToken>(postUrl, { url: window.location.href }))
        );
        // Save token to session storage
        sessionStorage.setItem('access_token', JSON.stringify(this.token));
    }

    async postTweet(secret: string, method: 'cat' | 'local', image: File | null) {
        if (this.token === undefined) throw new Error('User not authorized');

        let formData = new FormData();
        formData.append('access_token', this.token.access_token);
        formData.append('tweet_secret', secret);
        formData.append('image_method', method);

        if (method === 'local' && image) formData.append('tweet_image', image);

        const postUrl = environment.serverUrl + '/twitter_post';
        const response = await lastValueFrom(this.http.post<Tweet>(postUrl, formData));
        console.log(response);

        return response;
    }

    async searchTweet(id: string) {
        if (this.token === undefined) throw new Error('User not authorized');

        const postUrl = environment.serverUrl + '/twitter_search/' + id;
        const response = await lastValueFrom(
            this.http.post(postUrl, { access_token: this.token.access_token }).pipe(retry({ count: 3, delay: 10000 }))
        );
        console.log(response);

        return response;
    }
}

interface TwitterAccessToken {
    readonly access_token: string;
    readonly expires_at: number;
    readonly expires_in: number;
    readonly scope: Array<string>;
    readonly token_type: string;
}

export interface Tweet {
    readonly id: string;
    readonly text: string;
}
