import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { WebviewFormBuilderModule } from '@clicca-webapp/webview/webview-plans/shared/class/webview-form-builder-module';
import { WebviewSaveParticipantHelper } from '@clicca-webapp/webview/webview-plans/shared/class/webview-save-participant-helper';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-payment-address',
  templateUrl: './webview-plans-payment-address.component.html',
  styleUrls: ['./webview-plans-payment-address.component.scss']
})
export class WebviewPlansPaymentAddressComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  // public user = this.route.snapshot.data.profile;
  public user = ParticipantHelper.getPaymentUser();

  public dataForm: FormGroup;
  public cepMask = InputMask.cepMask;
  public states = Enum.states;

  public message = MessageError;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private webviewFormBuilderModule: WebviewFormBuilderModule,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.user_id && this.route.snapshot.queryParams.ip) {
      this.createDataForm();
    } else {
      this.router.navigate([`/webview/error`]);
    }
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

  isAddressEqual(event){
    if(event.target.checked) {
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('street').setValue(this.user.address.line1);
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('number').setValue(this.user.address.number);
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('district').setValue(this.user.address.district);
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('city').setValue(this.user.address.city);
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('state').setValue(this.user.address.state);
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('postal_code').setValue(this.user.address.zip);
    } else {
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('street').setValue('');
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('number').setValue('');
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('district').setValue('');
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('city').setValue('');
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('state').setValue('');
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address').get('postal_code').setValue('');
    }
  }

  createDataForm(): void {
    this.dataForm = this.webviewFormBuilderModule.getPaymentMethod(this.user);
    const holder = this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address');
    holder.get('street').setValidators([Validators.required]);
    holder.get('number').setValidators([Validators.required]);
    holder.get('district').setValidators([Validators.required]);
    holder.get('city').setValidators([Validators.required]);
    holder.get('state').setValidators([Validators.required]);
    holder.get('postal_code').setValidators([Validators.required]);
  }

  submitForm(){
    const data = this.createAddress(JSON.parse(JSON.stringify( this.dataForm.value ) ));
    WebviewSaveParticipantHelper.save(data, this.user);
    this.router.navigate([`/webview/plan/payment/card/${this.route.snapshot.params.offer_plan_id}`], { queryParamsHandling: "merge" });
  }

  createAddress(object) {
    if(!object.pre_approval.sender.address.postal_code && !this.user.address) {
      object.pre_approval.sender['address'] = object.pre_approval.payment_method.credit_card.holder.address;
    }
    return object;
  }

  isFieldValid(field: string, attr = null) {
    const form = this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder').get('address');
    const input = attr ? form.get(attr) : form
    return !form.get(field).valid && form.get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
