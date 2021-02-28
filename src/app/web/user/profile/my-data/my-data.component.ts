import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'user-profile-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDataComponent implements OnInit {

  public user = User.fromCache();
  constructor(public router: Router) { }

  ngOnInit() {
  }

}
