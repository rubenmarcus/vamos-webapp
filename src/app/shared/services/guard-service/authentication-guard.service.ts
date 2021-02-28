import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router, private profileService: ProfileService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.getUser().then(result => {
      const user = User.fromCache();
     // console.log(user.access_token);
      return true;
    }).catch(error => {
      const user = User.fromCache();
     // console.log(user.access_token);
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    });
  }

  getUser() {
    const user = User.fromCache();
    return new Promise((resolve, reject) => {
      if ( user.id ) {
        //console.log('Token',user.access_token);
        sessionStorage.setItem('access_token', user.access_token);
        this.profileService.Uinfo(user.id).subscribe(res => {
          // if ( res.status === 'active' && new Date(res.session_expires_at) > new Date() ) {
          //   resolve(true);
          // } else {
          //   reject(false);
          // }

          if ( res.status === 'active') {
            resolve(true);
          } else {
            reject(false);
          }
        });
      } else {
        reject(false);
      }
    });
  }

}
