import { Injectable } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = User.fromCache();
    try {
     // console.log('user token', user.access_token);
      user.verifyKey();
      user.checkExpiration();
      this.router.navigateByUrl('/');
      return false;
    } catch (error) {
      return true;
    }
  }
}
