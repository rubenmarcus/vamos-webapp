import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-stores',
  templateUrl: './my-stores.component.html',
  styleUrls: ['./my-stores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyStoresComponent implements OnInit {

  public user = User.fromCache();

  constructor() { }

  ngOnInit() {
  }

}
