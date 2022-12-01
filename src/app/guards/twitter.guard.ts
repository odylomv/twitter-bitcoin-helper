import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TwitterService } from '../services/twitter.service';

@Injectable({
  providedIn: 'root',
})
export class TwitterGuard implements CanActivate {
  constructor(private twitterService: TwitterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.queryParams['state']) {
      // Clear query params after getting the access token
      this.twitterService.requestAccessToken();
      this.router.navigate([]);
    }

    return true;
  }
}
