import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TwitterService } from '../services/twitter.service';

@Injectable({
    providedIn: 'root',
})
export class TwitterGuard implements CanActivate {
    constructor(private twitterService: TwitterService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (route.queryParams['state']) {
            // Clear query params after getting the access token
            this.twitterService.get_access_token().then(_token => this.router.navigate([]));
            return false;
        }

        return true;
    }
}
