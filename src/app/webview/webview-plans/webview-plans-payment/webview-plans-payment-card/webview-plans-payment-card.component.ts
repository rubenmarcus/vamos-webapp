import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";
import { PagseguroCardService } from '@clicca-webapp/shared/services/plan-service/pagseguro-card.service';
import { ValidateDate, validatePhone, ValidateExpirationDate, Cpf } from '@clicca-webapp/shared/class/validator.method';
import { WebviewFormBuilderModule } from '@clicca-webapp/webview/webview-plans/shared/class/webview-form-builder-module';
import { WebviewSaveParticipantHelper } from '@clicca-webapp/webview/webview-plans/shared/class/webview-save-participant-helper';
import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-payment-card',
  templateUrl: './webview-plans-payment-card.component.html',
  styleUrls: ['./webview-plans-payment-card.component.scss']
})
export class WebviewPlansPaymentCardComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  // private user = this.route.snapshot.data.profile;
  public user = ParticipantHelper.getPaymentUser();

  public showDialog;
  public dataForm: FormGroup;
  public inputMask = InputMask;
  public phoneMask = InputMask.phoneMask;
  public messageError = MessageError;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mobilePlanService: MobilePlanService,
    private webviewFormBuilderModule: WebviewFormBuilderModule,
    private pagseguroCardService: PagseguroCardService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.user_id && this.route.snapshot.queryParams.ip) {
      this.sessionPagSeguro();
      this.createDataForm();
      this.listeningChangeRoutes();
    } else {
      this.router.navigate([`/webview/error`]);
    }
  }

  sessionPagSeguro() {
    if(!this.pagseguroCardService.getPagSeguro()){
      this.pagseguroCardService.setSessionPagSeguro();
    }
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(event.target.value)){
      this.phoneMask = InputMask.cellMask;
    }else{
      this.phoneMask = InputMask.phoneMask;
    }
  }

  listeningChangeRoutes(): void {
    this.showDialog = this.route.snapshot.queryParams.showDialog;
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.showDialog = this.route.snapshot.queryParams.showDialog;
        })
    );
  }

  createDataForm(): void {
    // this.dataForm = this.webviewFormBuilderModule.getPaymentCard(this.user);
    this.dataForm = this.webviewFormBuilderModule.getPaymentMethod(this.user);
    const holder = this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder');
    holder.get('name').setValidators([Validators.required]);
    holder.get('birth_date').setValidators([Validators.required, ValidateDate]);
    holder.get('telephone').setValidators([Validators.required, validatePhone]);
    holder.get('card_number').setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(19)]);
    holder.get('expiration_date').setValidators([Validators.required, ValidateExpirationDate]);
    holder.get('cvv').setValidators([Validators.required]);
    holder.get('document').get('value').setValidators([Validators.required, Cpf]);
  }

  submitForm() {
    Helpers.applySpinner();
    this.pagseguroCardService.createTokenPagSeguro(this.dataForm.value)
    .then(result => {
      this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('token').setValue(result);
      this.sendingPayment();
    })
    .catch(error => {
      Helpers.removeSpinner();
      this.showMessageError(error);
    });
  }

  sendingPayment() {
    const data = WebviewSaveParticipantHelper.send(this.dataForm.value);

    this.subscriptions.push(
      this.mobilePlanService.subscriptions(this.route.snapshot.params.offer_plan_id, data).subscribe(
        result => {
          Helpers.removeSpinner();
          sessionStorage.removeItem('payment');
          sessionStorage.removeItem('payment_user');
          this.router.navigate([`/webview/payment/success/${this.route.snapshot.params.offer_plan_id}`], { queryParamsHandling: "merge" });
        },
        error => {
          Helpers.removeSpinner();
          this.showMessageError(error.error.message);
        }
      )
    );
  }

  isFieldValid(field: string, attr = null) {
    const form = this.dataForm.get('pre_approval').get('payment_method').get('credit_card').get('holder');
    const input = attr ? form.get(attr) : form
    return !input.get(field).valid && input.get(field).touched;
  }

  showMessageError(error) {
    this.showDialog = error;
    this.router.navigate([`/webview/plan/payment/card/${this.route.snapshot.params.offer_plan_id}`], { queryParams: {showDialog: error}, queryParamsHandling: "merge" });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
