import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'user-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserLeftMenuComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit() {
  }

  logout() {
    const user = User.fromCache();
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.logout(user.id, user.session_token).subscribe(
        result => {
          this.clear();
        },
        error => {
          this.clear();
        },
      )
    );
  }

  clear() {
    Helpers.removeSpinner();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
