import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-water-pump',
  templateUrl: './advertise-implemental-water-pump.component.html',
  styleUrls: ['./advertise-implemental-water-pump.component.scss']
})
export class AdvertiseImplementalWaterPumpComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public condition = Enum.condition;
  public options = InputMask.number;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor() { }

  ngOnInit() {
    this.setValidators();
  }

  setValidators() {
    this.advertiseForm.get('implement').get('flow').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('rotation').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('suction').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('recalque').setValidators([Validators.required]);
  }

  isFieldValid(attr, field: string) {
    return !this.advertiseForm.get(attr).get(field).valid && this.advertiseForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
