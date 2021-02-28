import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-grain-extractor',
  templateUrl: './advertise-implemental-grain-extractor.component.html',
  styleUrls: ['./advertise-implemental-grain-extractor.component.scss']
})
export class AdvertiseImplementalGrainExtractorComponent implements OnInit {

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
    this.advertiseForm.get('implement').get('average_production').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('rotation').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('thread_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('bag').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('discharge_height').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('working_length').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('working_height').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('working_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_length').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_height').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_width').setValidators([Validators.required]);
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
