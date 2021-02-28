import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Router } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public  user = User.fromCache();
  constructor(public router: Router) { }
  showTab = false;
  ngOnInit() {
    this.Tab();
  }





  Tab() {
   if (this.router.url === '/perfil/meus-dados/alterar-senha') {
      this.showTab = false;
    } if (this.router.url === '/perfil/meus-dados') {
       this.showTab = true;
    }
  }

}
