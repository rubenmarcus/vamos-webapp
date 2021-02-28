import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BrandsService } from '@clicca-webapp/shared/services/vehicle-selling/brands-service/brands.service';
import { ModelsService } from '@clicca-webapp/shared/services/vehicle-selling/models-service/models.service';
import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';

import { HelpersOffer } from '@clicca-webapp/web/offers/advertise/shared/class/helpers-offer';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-vehicular',
  templateUrl: './advertise-vehicular.component.html',
  styleUrls: ['./advertise-vehicular.component.scss']
})
export class AdvertiseVehicularComponent implements OnInit {

  @Input() offerSelected;
  @Input() advertiseForm: FormGroup;
  @Output() implementalSelected = new EventEmitter();

  private subscriptions: Subscription[] = [];

  public bodyTypes = [];
  public kinds = [];
  public brands = [];
  public models = [];
  public firstAccess = HelpersOffer.isFirstAccess();

  public implementsTypes = Enum.implementsTypes;
  public priceMask = InputMask.priceMask;
  public validateForm = ValidateForm;

  public message = MessageError;

  constructor(
    private componentsService: ComponentsService,
    private brandsService: BrandsService,
    private modelsService: ModelsService
  ) { }

  ngOnInit() {
    this.getKind();
    this.getBrand();
    this.getBodyType();
    this.setValidateTruck();

    this.advertiseForm.get('vehicle').get('type').setValue(Enum.categoryToBrand[this.offerSelected.type]);
    this.advertiseForm.get('vehicle').get('typeImplement').setValue(this.offerSelected.type);
  }

  setValidateTruck() {
    if ( this.offerSelected.type === 'truck' ) {
      this.advertiseForm.get('vehicle').get('body_type_id').setValidators([Validators.required]);
    }
  }

  changeBrand(event){
    this.advertiseForm.get('vehicle').get('model_id').setValue('');
    this.advertiseForm.get('vehicle').get('model_id').disable();
    if(event.target.value !== "" ){
      this.getModel(event.target.value);
    }
  }

  onChangeType(event){
    const value = event.target.value;
    this.implementalSelected.emit(event.target.value);
  }

  getKind(){
    this.subscriptions.push(
      this.componentsService.byType('kind', {status: 'active'}).subscribe(res => {
        this.kinds = res.objects;
      })
    );
  }

  getBrand(){
    this.subscriptions.push(
      this.brandsService.byKind(Enum.categoryToBrand[this.offerSelected.type], {status: 'active'}).subscribe(res => {
        this.brands = res;
        if(this.isUpdate() && this.advertiseForm.get('vehicle').get('brand_id').value){
          this.getModel(this.advertiseForm.get('vehicle').get('brand_id').value);
        }
      })
    );
  }

  getModel(id){
    this.subscriptions.push(
      this.modelsService.index(id, {status: 'active'}).subscribe(res => {
        this.models = res.objects;
        this.advertiseForm.get('vehicle').get('model_id').enable();
        if(this.isUpdate() && this.advertiseForm.get('vehicle').get('model_id').value){
          this.advertiseForm.get('vehicle').get('model_id').disable();
        }
      })
    );
  }

  getBodyType(){
    this.subscriptions.push(
      this.componentsService.byType('body_type', {status: 'active'}).subscribe(res => {
        this.bodyTypes = res.objects;
      })
    );
  }

  translatedName(){
    const available = {
      truck: 'Caminhão',
      truckBody: 'Carroceria',
      tractorsAndImplements: 'Conjunto',
      tractorUnit: 'Cavalo',
      bus: 'Ônibus & Microônibus',
      tractorAgricultural: 'Tratores agrícolas',
      agros: 'Máquinas & Implementos'
    }
    return available[this.offerSelected.type];
  }

  isUpdate():boolean{
    return this.offerSelected.offer_id ? true : false;
  }

  isImplement(): boolean {
    return this.offerSelected.type === 'sprayerVehicle' || this.offerSelected.type === 'harvesterVehicle' ? true : false;
  }

  isTruck(): boolean {
    return this.offerSelected.type == 'truck' ? true : false;
  }

  isBus(): boolean {
    return this.offerSelected.type == 'bus' ? true : false;
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
