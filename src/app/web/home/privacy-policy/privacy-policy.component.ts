import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContentServiceService } from '@clicca-webapp/shared/services/authenticator-service/content-service/content-service.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PrivacyPolicyComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public policy;

  constructor(
    private contentServiceService: ContentServiceService
  ) { }

  ngOnInit() {
    this.getPolicy();
  }

  getPolicy() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.contentServiceService.policies().subscribe(res => {
        this.policy = res.body;
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
