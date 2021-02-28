import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { PagseguroCardService } from '@clicca-webapp/shared/services/plan-service/pagseguro-card.service';
import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';

@Component({ preserveWhitespaces: false,
  selector: 'app-plan-payment-card',
  templateUrl: './plan-payment-card.component.html',
  styleUrls: ['./plan-payment-card.component.scss']
})
export class PlanPaymentCardComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() dataForm: FormGroup;
  @Output() page = new EventEmitter;

  public inputMask = InputMask;
  public phoneSenderMask = InputMask.phoneMask;
  public documentMask = InputMask.cpfMask;
  public error = MessageError;
  public states = Enum.states;

  constructor(
    private cepService: CepService,
    private offerPlansService: OfferPlansService,
    private pagseguroCardService: PagseguroCardService
  ) { }

  ngOnInit() {
    if(!this.pagseguroCardService.getPagSeguro()){
      this.pagseguroCardService.setSessionPagSeguro();
    }
  }

  nextStep(id) {
    this.page.emit(id);
  }

  focusCep(event) {
    if (event.target.value) {
      this.subscriptions.push(
        this.cepService.getaddress(event.target.value.replace(/[^\d]+/g, '')).subscribe(res => {
          if (!res.error) {
            this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('street').setValue(res.logradouro);
            this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('district').setValue(res.bairro);
            this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('city').setValue(res.localidade);
            this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('state').setValue(res.uf);
          }
        })
      );
    }
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(event.target.value)){
      this.phoneSenderMask = InputMask.cellMask;
    }else{
      this.phoneSenderMask = InputMask.phoneMask;
    }
  }

  changeMaskDocument(event) {
    const value = event.target.value.replace(/[^\d]+/g, '');
    if (value.length < 11) {
      this.documentMask = InputMask.cpfMask;
    } else if (value.length >= 11) {
      this.documentMask = InputMask.cnpjMask;
    }
  }

  isFieldValid(field: string, attr = null) {
    const form = this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder');
    const input = attr ? form.get(attr) : form
    return !input.get(field).valid && input.get(field).touched;
  }

  submit() {
    Helpers.applySpinner();
    this.pagseguroCardService.createTokenPagSeguro(this.dataForm.value)
    .then(result => {
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('token').setValue(result);
      this.sendingPayment();
    })
    .catch(error => {
      Alert.error(error);
      Helpers.removeSpinner();
    });
  }

  sendingPayment() {
    const data = this.removingMask(JSON.parse(JSON.stringify( this.dataForm.value ) ));
    this.subscriptions.push(
      this.offerPlansService.subscriptions(data.subscription.offer_plan_id, data).subscribe(
        result => {
          this.page.emit(4);
          Helpers.removeSpinner();
        },
        error => {
          Alert.error(error.error.message);
          Helpers.removeSpinner();
        }
      )
    );
  }

  onlyNumber(value): string {
    value = value.replace(/[^\d]+/g, '');
    return value;
  }

  removingMask(object) {
    const phoneSender = this.onlyNumber(object.pre_approval.sender.telephone);
    object.pre_approval.sender.phone.area_code = phoneSender.substring(0, 2);
    object.pre_approval.sender.phone.number = phoneSender.substring(2);

    const phoneCard = this.onlyNumber(object.pre_approval.payment_method.credit_card.holder.telephone);
    object.pre_approval.payment_method.credit_card.holder.phone.area_code = phoneCard.substring(0, 2);
    object.pre_approval.payment_method.credit_card.holder.phone.number = phoneCard.substring(2);

    const documentSender = this.onlyNumber(object.pre_approval.sender.document.value);
    object.pre_approval.sender.document.value = documentSender;

    const documentCard = this.onlyNumber(object.pre_approval.payment_method.credit_card.holder.document.value);
    object.pre_approval.payment_method.credit_card.holder.document.value = documentCard;

    const zip = this.onlyNumber(object.pre_approval.payment_method.credit_card.holder.address.postal_code);
    object.pre_approval.payment_method.credit_card.holder.address.postal_code = zip;

    object.pre_approval.sender.address.postal_code = this.onlyNumber(object.pre_approval.sender.address.postal_code);

    delete object.term
    delete object.billingAddress
    delete object.pre_approval.sender.telephone
    delete object.pre_approval.payment_method.credit_card.holder.telephone
    delete object.pre_approval.payment_method.credit_card.holder.card_number
    delete object.pre_approval.payment_method.credit_card.holder.expiration_date
    delete object.pre_approval.payment_method.credit_card.holder.cvv

    return object;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
