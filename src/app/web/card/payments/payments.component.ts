import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { DomSanitizer, SafeResourceUrl,} from '@angular/platform-browser';
import { Routes, Router } from '@angular/router';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'card-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CardPaymentsComponent implements OnInit, OnDestroy {
  public paymentForm: FormGroup;
  private user = User.fromCache();
  private subscriptions: Subscription[] = [];
  public owner = [];
  public dependents = [];
  public ownerId;
  ownId;
  loaded = false;
  public plans = [];
  public planId;
  public boleto_url;
  openBoleto = false;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getCard();

  }

  getCard() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.getOwner(this.user.id).subscribe(res => {

        // console.log(res);
        this.dependents = this.filterDependent(res[0].dependents);
        this.owner = res[0].owner.card_user;
        this.ownerId = res[0].id;
        this.ownId = res[0].owner.id;
       // console.log(this.dependents);
        this.createFormUser(res);
        this.getPlan();

        this.loaded = true;
        Helpers.removeSpinner();
      }
     )
    );
  }


  createFormUser(res) {
    this.paymentForm = this.formBuilder.group({
      type: 'boleto',
      recharge: this.formBuilder.group({
        account_id: res[0].id,
        card_id: ['', [Validators.required]],
        order_attributes: this.formBuilder.group({
          amount: ['', [Validators.required, noEmoji]]
        }),
        }),
      });
    }

    isFieldValid(field: string, attr = null ) {
      if (attr) {
        return !this.paymentForm.get('recharge').get(attr).get(field).valid && this.paymentForm.get('recharge').get(attr).get(field).touched;
      } else {
        return !this.paymentForm.get('recharge').get(field).valid && this.paymentForm.get('recharge').get(field).touched;
      }
    }


    filterDependent(dependents) {
      return dependents.filter(element => {
        return element.status === 'active';
      });
    }



    Pay() {
      const PaymentData = {
        type: 'boleto',
        payment: {
          account_id: this.ownerId ,
          plan_id: this.planId
        },
        };
       //  console.log(PaymentData);

      this.subscriptions.push(
        this.cardService.Pay(PaymentData).subscribe(res => {
        Helpers.removeSpinner();
        // console.log('Payment', res);
        this.boleto_url = res.order.payment_link;
        //  console.log(res);
       //  this.boleto_url = res.order.payment_link;
       // console.log(this.boleto_url);
        this.openBoleto = true;
      }
      ));
    }


  getPlan(){
    this.subscriptions.push(
      this.cardService.getAllPlans().subscribe(res => {
      Helpers.removeSpinner();
     // console.log('Planos', res);
      this.plans = res.objects[0];
      this.planId = res.objects[0].id;
    }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
