import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-truck-body',
  templateUrl: './advertise-implemental-truck-body.component.html',
  styleUrls: ['./advertise-implemental-truck-body.component.scss']
})
export class AdvertiseImplementalTruckBodyComponent implements OnInit {

  @Input() offerSelected;
  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];
  private plate;

  public years = Helpers.datePeriod();
  public bodyTipes = [];
  public states = Enum.states;
  public tyreConditions = Enum.tyreCondition;
  public condition = Enum.condition;
  public options = InputMask.number;
  public yearMask = InputMask.yearMask;
  public plateMask = InputMask.plateMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor(
    private componentsService: ComponentsService
  ) { }

  ngOnInit() {
    this.getBodyType();
    this.setValidators();
    this.setYear();
    this.plate = this.advertiseForm.get('implement').get('plate').value;
  }

  setYear() {
    if ( this.advertiseForm.get('implement').get('year').value === 0 ) {
      this.advertiseForm.get('implement').get('year').setValue(null);
    }
  }

  setValidators(){
    this.advertiseForm.get('implement').get('year').setValidators([Validators.required, Validate.year]);
    this.advertiseForm.get('implement').get('body_type_id').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('plate').setValidators([Validators.required, Validate.plate]);
  }

  isPlate(): boolean {
    return this.plate ? true : false;
  }

  getBodyType(){
    this.subscriptions.push(
      this.componentsService.byType('body_type', {status: 'active'}).subscribe(res => {
        this.bodyTipes = res.objects;
      })
    );
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
