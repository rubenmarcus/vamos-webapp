import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-rake',
  templateUrl: './advertise-implemental-rake.component.html',
  styleUrls: ['./advertise-implemental-rake.component.scss']
})
export class AdvertiseImplementalRakeComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public condition = Enum.condition;
  public options = InputMask.number;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor() { }

  ngOnInit() {
    this.setValidators();
    this.advertiseForm.get('implement').get('type').setValue('rake');
  }

  setValidators() {
    this.advertiseForm.get('implement').get('working_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('line_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('transport_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('max_capacity').setValidators([Validators.required]);
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
