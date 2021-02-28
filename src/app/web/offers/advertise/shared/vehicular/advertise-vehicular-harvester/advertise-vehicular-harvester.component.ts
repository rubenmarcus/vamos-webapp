import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-vehicular-harvester',
  templateUrl: './advertise-vehicular-harvester.component.html',
  styleUrls: ['./advertise-vehicular-harvester.component.scss']
})
export class AdvertiseVehicularHarvesterComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public tyreConditions = Enum.tyreCondition;
  public cabins = Enum.cabin;
  public wheelTypes = Enum.wheelType;
  public transmissions = Enum.transmission;
  public precisionAgriculture = Enum.precisionAgriculture;
  public harvest = Enum.harvest;
  public condition = Enum.condition;
  public options = InputMask.number;
  public yearMask = InputMask.yearMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor() { }

  ngOnInit() {
    this.setValidators();
    this.setYear();
    this.advertiseForm.get('vehicle').get('type').setValue('harvester');
  }

  setYear() {
    if ( Number(this.advertiseForm.get('vehicle').get('year').value) === 0 ) {
      this.advertiseForm.get('vehicle').get('year').setValue(null);
    }
    if ( Number(this.advertiseForm.get('vehicle').get('year_model').value) === 0 ) {
      this.advertiseForm.get('vehicle').get('year_model').setValue(null);
    }
  }

  setValidators() {
    this.advertiseForm.get('vehicle').get('year').setValidators([Validators.required, Validate.year]);
    this.advertiseForm.get('vehicle').get('year_model').setValidators([Validate.year]);
    this.advertiseForm.get('vehicle').get('usage_hours').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('rated_power').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('harvest_speed').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('bulk_tank').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('pipe').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('flow_rate').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('cutting_platform').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('tyre_condition').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('cabin').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('harvest').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('wheel_type').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('transmission').setValidators([Validators.required]);
    this.advertiseForm.get('vehicle').get('precision_agriculture').setValidators([Validators.required]);
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
