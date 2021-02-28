import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Routes, Router } from '@angular/router';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'card-payment-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RechargeComponent implements OnInit {
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
  openCard = false;
  PaymentDetails;
  rechargevalue: any = "1";

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
checkValue(event)
{

  console.log(event.target.value);
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

  noOpenCard() {
    this.openBoleto = false;
    this.openCard = false;
    this.loaded = true;
  }

  submitForm(type) {
    if (ValidateForm.submitValidation(this.paymentForm)) {this.submit(type); }
  }

  submit(type) {
    Helpers.applySpinner();
    if (type === 'boleto') {
      this.subscriptions.push(
        this.cardService.recharge(this.paymentForm.value).subscribe(res => {
         Helpers.removeSpinner();
         this.boleto_url = res.order.payment_link;
         this.openBoleto = true;
         this.openCard = false;
       },
         error => {
           Alert.error(error);
         }
       )
      );
    }
    if (type === 'cc'){
      this.PaymentDetails = {
        payment: {
          account_id: this.ownerId ,
          plan_id: this.planId,
          amount: this.paymentForm.get('recharge').get('order_attributes').get('amount').value,
          card_id: this.ownId
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
