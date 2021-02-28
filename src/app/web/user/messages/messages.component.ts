import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { MessageService } from '@clicca-webapp/shared/services/profile-service/message.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public msgs = [];

  constructor(public messages: MessageService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.messages.message().subscribe(res => {
        this.msgs =  res.objects;
        Helpers.removeSpinner();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
