import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-seed-drill',
  templateUrl: './advertise-implemental-seed-drill.component.html',
  styleUrls: ['./advertise-implemental-seed-drill.component.scss']
})
export class AdvertiseImplementalSeedDrillComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public condition = Enum.condition;
  public system = Enum.systemSeedDrill;
  public flowTypes = Enum.flowType;
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
    this.advertiseForm.get('implement').get('deposit_capacity').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('fertilize_tank').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('rows').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('line_space').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('overall_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('header_width').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('depth').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('system').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('flow_type').setValidators([Validators.required]);
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
