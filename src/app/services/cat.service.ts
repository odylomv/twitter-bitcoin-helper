import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

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
    id: string;
    url: string;
    width: number;
    height: number;
}
