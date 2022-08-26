import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CatService {
    constructor(private http: HttpClient) {}

    async getRandomCat() {
        return await lastValueFrom(this.http.get<CatImage>(environment.serverUrl + '/cat_image'));
    }
}

interface CatImage {
    readonly id: string;
    readonly url: string;
    readonly width: number;
    readonly height: number;
}
