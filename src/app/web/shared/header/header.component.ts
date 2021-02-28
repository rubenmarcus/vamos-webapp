import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input() typeHeader: string;

  private subscriptions: Subscription[] = [];
  public session: boolean;
  public showMenu: boolean = false;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService
  ) { }

  ngOnInit() {
    this.session = new SessionChecker().isSessionStarted;
  }

  showNav() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
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
