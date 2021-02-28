import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { MessagesService } from '@clicca-webapp/shared/services/vehicle-selling/messages-service/messages.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Router } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'chat-box-user',
  templateUrl: './box-user.component.html',
  styleUrls: ['./box-user.component.scss']
})
export class BoxUserComponent implements OnInit {

  public users;

  constructor(
  ) { }

  ngOnInit() {
  }



}
