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
  selector: 'app-advertise-vehicular-heavy-vehicle',
  templateUrl: './advertise-vehicular-heavy-vehicle.component.html',
  styleUrls: ['./advertise-vehicular-heavy-vehicle.component.scss']
})
export class AdvertiseVehicularHeavyVehicleComponent implements OnInit {

  @Input() offerSelected;
  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];
  private plate;

  // public years = Helpers.datePeriod();
  public colors = [];
  public wheelDrives = [];
  public states = Enum.states;
  public fuels = Enum.fuel;
  public tyreConditions = Enum.tyreCondition;
  public condition = Enum.condition;
  public options = InputMask.number;
  public yearMask = InputMask.yearMask;
  public plateMask = InputMask.plateMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor(
    private componentsService: ComponentsService,
  ) { }

  ngOnInit() {
    this.getColor();
    this.getWheelDrive();
    this.setValidators();
    this.setYear();
    this.plate = this.advertiseForm.get('vehicle').get('plate').value;
    this.advertiseForm.get('vehicle').get('type').setValue('tractor_unit');
  }

  setYear() {
    if ( Number(this.advertiseForm.get('vehicle').get('year').value) === 0 ) {
      this.advertiseForm.get('vehicle').get('year').setValue(null);
    }
    if ( Number(this.advertiseForm.get('vehicle').get('year_model').value) === 0 ) {
      this.advertiseForm.get('vehicle').get('year_model').setValue(null);
    }
  }

  setValidators(){
    this.advertiseForm.get('vehicle').get('year').setValidators([Validators.required, Validate.year]);
    this.advertiseForm.get('vehicle').get('year_model').setValidators([Validate.year]);
    this.advertiseForm.get('vehicle').get('plate').setValidators([Validators.required, Validate.plate]);
  }

  isPlate(): boolean {
    return this.plate ? true : false;
  }

  getColor(){
    this.subscriptions.push(
      this.componentsService.byType('color').subscribe(res => {
        this.colors = res.objects;
      })
    );
  }

  getWheelDrive(){
    this.subscriptions.push(
      this.componentsService.byType('wheel_drive', {status: 'active'}).subscribe(res => {
        this.wheelDrives = res.objects;
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
