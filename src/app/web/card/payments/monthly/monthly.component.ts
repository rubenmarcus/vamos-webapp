import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Routes, Router, ActivatedRoute } from '@angular/router';


@Component({ preserveWhitespaces: false,
  selector: 'card-payment-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardPaymentMonthlyComponent implements OnInit, OnDestroy {

  openBoleto = false;
  boleto_url;
  private subscriptions: Subscription[] = [];
  public plans = [];
  public planId;
  public ownerID;
  paymentId;
  payments;
  private user = User.fromCache();
  public loaded = false;
  openCard = false;
  PaymentDetails;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    public sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paymentId =  this.activatedRoute.snapshot.paramMap.get('id');

    this.getPlan();
    this.getCard();

  }

  checkifBoleto() {
    if (this.openBoleto) {
      this.openBoleto = false;
    } else { this.openBoleto = true; }
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
        this.payments = this.filterPayment(res.objects);
        this.loaded = true;
     }
     )
    );
  }

  filterPayment(payment) {
    return payment.filter(element => {
      return element.id === this.paymentId;
    });
  }


  getPlan() {
    this.subscriptions.push(
      this.cardService.getAllPlans().subscribe(res => {
      Helpers.removeSpinner();
     // console.log('Planos', res);
      this.plans = res.objects[0];
      this.planId = res.objects[0].id;
    }
    ));
  }
  noOpenCard() {
    this.openBoleto = false;
    this.openCard = false; 
    this.loaded = true;
    //console.log('OpenCard', this.openBoleto);
  }
  
  Pay(type) {

    if (type === 'boleto') {
      const PaymentData = {
        type: 'boleto',
        payment: {
          account_id: this.ownerID ,
          plan_id: this.planId
        },
        };
      this.subscriptions.push(
        this.cardService.Pay(PaymentData).subscribe(res => {
        Helpers.removeSpinner();
        this.boleto_url = res.order.payment_link;
        this.openBoleto = true;
        this.openCard = false;
          }
          ));
        }

        if (type === 'cc') {
          this.PaymentDetails = {
            payment: {
              account_id: this.ownerID ,
              plan_id: this.planId,
            }
          };
            this.loaded = false;
           this.openCard = true;
           this.openBoleto = false;
           Helpers.removeSpinner();
        }
    }

    ngOnDestroy() {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }

 }

