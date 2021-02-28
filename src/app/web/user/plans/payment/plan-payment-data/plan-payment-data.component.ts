import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-plan-payment-data',
  templateUrl: './plan-payment-data.component.html',
  styleUrls: ['./plan-payment-data.component.scss']
})
export class PlanPaymentDataComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() dataForm: FormGroup;
  @Output() page = new EventEmitter;

  private user = this.route.snapshot.data.user;

  public inputMask = InputMask;
  public phoneSenderMask = InputMask.phoneMask;
  public documentMask = InputMask.cpfMask;
  public error = MessageError;
  public states = Enum.states;

  constructor(
    private route: ActivatedRoute,
    private cepService: CepService,
  ) { }

  ngOnInit() {
    if (this.isCompany()) {
      this.documentMask = InputMask.cnpjMask;
    } else {
      this.documentMask = InputMask.cpfMask;
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
            this.dataForm.get('pre_approval').get('sender').get('address').get('street').setValue(res.logradouro);
            this.dataForm.get('pre_approval').get('sender').get('address').get('district').setValue(res.bairro);
            this.dataForm.get('pre_approval').get('sender').get('address').get('city').setValue(res.localidade);
            this.dataForm.get('pre_approval').get('sender').get('address').get('state').setValue(res.uf);
          }
        })
      );
    }
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if (regex.test(event.target.value)) {
      this.phoneSenderMask = InputMask.cellMask;
    } else {
      this.phoneSenderMask = InputMask.phoneMask;
    }
  }

  isCompany() {
    return this.user.type === 'Company' ? true : false;
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
