import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { WebviewFormBuilderModule } from '@clicca-webapp/webview/webview-plans/shared/class/webview-form-builder-module';
import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";
import { WebviewSaveParticipantHelper } from '@clicca-webapp/webview/webview-plans/shared/class/webview-save-participant-helper';
import { getIPs } from '@clicca-webapp/shared/class/ip';
import { validatePhone, CpfCnpj } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-payment-data',
  templateUrl: './webview-plans-payment-data.component.html',
  styleUrls: ['./webview-plans-payment-data.component.scss']
})
export class WebviewPlansPaymentDataComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public user = ParticipantHelper.getPaymentUser();

  public dataForm: FormGroup;
  public phoneMask = InputMask.phoneMask;
  public documentMask = InputMask.cpfMask;

  public messageError = MessageError;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private webviewFormBuilderModule: WebviewFormBuilderModule
  ) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.user_id && this.route.snapshot.queryParams.ip) {
      this.createDataForm();
      this.setMask();
      this.getIp();
    } else {
      this.router.navigate([`/webview/error`]);
    }
  }

  setMask(): void {
    this.documentMask = ParticipantHelper.isCompany(this.user.type) ? InputMask.cnpjMask : InputMask.cpfMask;
    this.phoneMask = ParticipantHelper.isCompany(this.user.type) ? InputMask.phoneMask : InputMask.cellMask;
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(event.target.value)){
      this.phoneMask = InputMask.cellMask;
    }else{
      this.phoneMask = InputMask.phoneMask;
    }
  }

  isCompany(): boolean {
    return ParticipantHelper.isCompany(this.user.type);
  }

  createDataForm(): void {
    // this.dataForm = this.webviewFormBuilderModule.getPaymentSender(this.user);
    this.dataForm = this.webviewFormBuilderModule.getPaymentMethod(this.user);
    const holder = this.dataForm.get('pre_approval').get('sender');
    holder.get('name').setValidators([Validators.required]);
    holder.get('email').setValidators([Validators.required, Validators.email]);
    holder.get('telephone').setValidators([Validators.required, validatePhone]);
    holder.get('document').get('value').setValidators([Validators.required, CpfCnpj]);
  }

  getIp() {
    getIPs( (ip) => {
      this.dataForm.get('pre_approval').get('sender').get('ip').setValue(this.route.snapshot.queryParams.ip);
    });
  }

  submitForm() {
    WebviewSaveParticipantHelper.save(this.dataForm.value, this.user);
    this.router.navigate([`/webview/plan/payment/address/${this.route.snapshot.params.offer_plan_id}`], { queryParamsHandling: "merge" });
  }

  isFieldValid(field: string, attr = null) {
    const form = this.dataForm.get('pre_approval').get('sender');
    const input = attr ? form.get(attr) : form
    return !input.get(field).valid && input.get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
