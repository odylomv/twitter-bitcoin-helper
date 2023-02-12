import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, retry, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  private token: TwitterAccessToken | undefined = undefined;
  private lastTimer: Subscription | null = null;
  private authStatus$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private encService: EncryptionService) {
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

    const response = await lastValueFrom(this.http.post<TwitterTokenAndKey>(postUrl, { url: window.location.href }));
    console.log(response);

    this.updateToken(response.token);
    // Save token to session storage
    sessionStorage.setItem('access_token', JSON.stringify(this.token));
  }

  async sendPublicKey(key: string) {
    if (this.token === undefined) throw new Error('User not authorized');

    const postUrl = environment.serverUrl + '/store_pub_key';

    const response = await lastValueFrom(
      this.http.post<TwitterTokenAndKey>(postUrl, { access_token: this.token.access_token, pub_key: key })
    );
    console.log(response);
  }

  async testVerify(message: string) {
    if (this.token === undefined) throw new Error('User not authorized');

    if (this.encService.lastKeys === null) throw new Error('DEBUG');

    const postUrl = environment.serverUrl + '/test_verify';
    const { hash, signature } = await this.encService.signMessage(this.encService.lastKeys.privateKey, message);
    console.log({ hash: this.encService.bufferToHex(hash), signature: this.encService.bufferToHex(signature) });

    const response = await lastValueFrom(
      this.http.post<TwitterTokenAndKey>(postUrl, {
        access_token: this.token.access_token,
        message,
        signature: this.encService.bufferToHex(signature),
      })
    );
    console.log('Resp');
    console.log(response);
  }

  async postTweet(
    secret: string,
    key: string,
    method: 'cat' | 'local',
    image: File | null,
    blockchain: 'main' | 'test'
  ) {
    if (this.token === undefined) throw new Error('User not authorized');

    const { signature } = await this.encService.signMessage(await this.encService.importSigningKey(key), secret);

    let formData = new FormData();
    formData.append('access_token', this.token.access_token);
    formData.append('tweet_secret', secret);
    formData.append('signature', this.encService.bufferToHex(signature));
    formData.append('image_method', method);
    formData.append('blockchain', blockchain);

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

interface TwitterTokenAndKey {
  readonly token: TwitterAccessToken;
  readonly key: string | undefined;
}

export interface Tweet {
  readonly id: string;
  readonly text: string;
}
