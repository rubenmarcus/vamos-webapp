import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrandsService } from '@clicca-webapp/shared/services/vehicle-selling/brands-service/brands.service';
import { ModelsService } from '@clicca-webapp/shared/services/vehicle-selling/models-service/models.service';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { HelpersOffer } from '@clicca-webapp/web/offers/advertise/shared/class/helpers-offer';
import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental',
  templateUrl: './advertise-implemental.component.html',
  styleUrls: ['./advertise-implemental.component.scss']
})
export class AdvertiseImplementalComponent implements OnInit {

  @Input() offerSelected;
  @Input() advertiseForm: FormGroup;
  @Output() implementalSelected = new EventEmitter();

  private subscriptions: Subscription[] = [];

  public firstAccess = HelpersOffer.isFirstAccess();
  public brands = [];
  public models = [];
  public bodyTipes = [];

  public implementsTypes = Enum.implementsTypes;
  public condition = Enum.condition;
  public priceMask = InputMask.priceMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor(
    private brandsService: BrandsService,
    private modelsService: ModelsService,
    private componentsService: ComponentsService
  ) { }

  ngOnInit() {
    this.getBrand();
    this.getBodyType();
  }

  changeBrand(event){
    this.advertiseForm.get('implement').get('model_id').setValue('');
    this.advertiseForm.get('implement').get('model_id').disable();
    if(event.target.value !== "" ){
      this.getModel(event.target.value);
    }
  }

  getModel(id){
    this.subscriptions.push(
      this.modelsService.index(id, {status: 'active'}).subscribe(res => {
        this.models = res.objects;
        this.advertiseForm.get('implement').get('model_id').enable();
        if(this.isUpdate()){
          this.advertiseForm.get('implement').get('model_id').disable();
        }
      })
    );
  }

  getBrand(){
    const brand = this.offerSelected.kind === 'both' ? 'truck_body' : Enum.categoryToBrand[this.offerSelected.type] || 'implement';
    this.subscriptions.push(
      this.brandsService.byKind( brand, {status: 'active'} ).subscribe(res => {
        this.brands = res;
        if(this.isUpdate()){
          this.getModel(this.advertiseForm.get('implement').get('brand_id').value);
        }
      })
    );
  }

  getBodyType(){
    this.subscriptions.push(
      this.componentsService.byType('body_type', {status: 'active'}).subscribe(res => {
        this.bodyTipes = res.objects;
      })
    );
  }

  onChangeType(event){
    const value = event.target.value;
    this.implementalSelected.emit(event.target.value);
  }

  isUpdate():boolean{
    return this.offerSelected.offer_id ? true : false;
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
