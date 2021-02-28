import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl,} from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class CardPaymentBoletoComponent implements OnInit, OnDestroy {
  boleto_url;
  payments;
  ownerID;
  boletoId;
  private user = User.fromCache();
  private subscriptions: Subscription[] = [];
  public loaded = false;

  constructor(
    public sanitizer: DomSanitizer,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this.boletoId =  this.activatedRoute.snapshot.paramMap.get('id');
     this.getCard();
  }

  getCard() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.getOwner(this.user.id).subscribe(res => {
        this.ownerID = res[0].owner.account_id;
        this.getPayments(this.ownerID);
      Helpers.removeSpinner();
      }
     )
    );
  }

  getPayments(owner) {
    this.subscriptions.push(
      this.cardService.getPayments(owner).subscribe(res => {
        this.payments = this.filterBoleto(res.objects);
        this.loaded = true;
      })
    );
  }

  filterBoleto(boleto) {
    return boleto.filter(element => {
      return element.id === this.boletoId;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
