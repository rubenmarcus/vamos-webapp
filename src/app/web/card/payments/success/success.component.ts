import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Routes, Router} from '@angular/router';

import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'card-payment-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardPaymentSuccessComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  constructor(
    public router: Router,
    private cardService: CardService
  ) { }

  ngOnInit() {
  }

  checkUserStatus() {
    this.subscriptions.push(
      this.cardService.getOwner(this.user.id).subscribe(res => {
        const status = res[0].status;
        switch (status) {
          case 'active': {
            this.router.navigate(['/cartao']);
            break;
          }
          case 'waiting_payment': {
            this.router.navigate(['/cartao/aguardando-pagamento']);
            break;
          }
          case 'initiated': {
            this.router.navigate(['/cartao/aguardando-pagamento']);
            break;
          }
          default: {
            this.router.navigate(['/cartao/beneficios']);
            break;
          }
        }
       })
      );
    }

    ngOnDestroy() {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }

}
