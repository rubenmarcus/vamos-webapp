import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'offers-item-body',
  templateUrl: './item-body.component.html',
  styleUrls: ['./item-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemBodyComponent implements OnInit {

  @Input() offer;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  isLogged(): boolean {
    return User.isLogged() && User.fromCache().id === this.offer.advertiser.user_id;
  }

}
