import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderProfileComponent implements OnInit {

  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = User.fromCache();
  }

}
