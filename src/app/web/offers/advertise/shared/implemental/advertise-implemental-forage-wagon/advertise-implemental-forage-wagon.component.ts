import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-forage-wagon',
  templateUrl: './advertise-implemental-forage-wagon.component.html',
  styleUrls: ['./advertise-implemental-forage-wagon.component.scss']
})
export class AdvertiseImplementalForageWagonComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public condition = Enum.condition;
  public options = InputMask.number;
  public yearMask = InputMask.yearMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor() { }

  ngOnInit() {
    this.setValidators();
    this.setYear();
  }

  setYear() {
    if ( this.advertiseForm.get('implement').get('year').value === 0 ) {
      this.advertiseForm.get('implement').get('year').setValue(null);
    }
  }

  setValidators() {
    this.advertiseForm.get('implement').get('year').setValidators([Validators.required, Validate.year]);
    this.advertiseForm.get('implement').get('back_discharge_time').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('front_discharge_cap').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('storage').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('total_height').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('height_discharge_spout').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('overall_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('overall_length').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_length').setValidators([Validators.required]);
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
