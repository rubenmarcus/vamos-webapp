import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import '@clicca-webapp/shared/class/string.prototype';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { HelpersOffer } from '@clicca-webapp/web/offers/advertise/shared/class/helpers-offer';
import { FormImplemental } from '@clicca-webapp/web/offers/advertise/shared/class/form-implemental';
import { FormBuilderVehicleModule } from '@clicca-webapp/web/offers/advertise/shared/class/form-builder-vehicle-module';
import { FormBuilderAdvertiseModule } from '@clicca-webapp/web/offers/advertise/shared/class/form-builder-advertise-module';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-about',
  templateUrl: './advertise-about.component.html',
  styleUrls: ['./advertise-about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvertiseAboutComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();
  private nextPage = [];

  public advertiseForm: FormGroup;
  public offer;
  public uploaded: boolean = false;
  public offerFromCache = HelpersOffer.offerFromCache();
  public advertiser_id = this.route.snapshot.params.advertiser_id;
  public offer_id = this.route.snapshot.params.id;
  public validateForm = ValidateForm;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
    private formImplemental: FormImplemental,
    private formBuilderVehicleModule: FormBuilderVehicleModule,
    private formBuilderAdvertiseModule: FormBuilderAdvertiseModule,
  ) { }

  ngOnInit() {
    Helpers.applySpinner();
    if(HelpersOffer.isUpdate()){
      this.getOffer();
    }else{
      this.createAdvertiseForm(new Offer());
    }
  }

  getOffer() {
    this.subscriptions.push(
      this.offersService.show(this.route.snapshot.params.id || HelpersOffer.offerFromCache().offer_id).subscribe(res => {
        this.offer = new Offer(res);
        this.createAdvertiseForm(this.offer);
      })
    );
  }

  createAdvertiseForm(offer): void {
    this.uploaded = true;
    Helpers.removeSpinner();
    this.advertiseForm = this.formBuilder.group({
      offer: this.formBuilderAdvertiseModule.getAdvertiser(this.route.snapshot.params.advertiser_id, offer),
      vehicle: this.formBuilderVehicleModule.getVehicle(offer),
      implement: this.formImplemental.implement(offer),
    });
  }

  getImplementalSelected(event) {
    let object = this.offerFromCache;
    object.type = event ? event : 'agros';
    if (event === 'sprayerVehicle' || event === 'harvesterVehicle') {
      object.kind = 'vehicular';
    }else{
      object.kind = 'implemental';
    }
    sessionStorage.setItem('offerSelected', JSON.stringify(object));
    this.createAdvertiseForm(new Offer());
  }

  submitSaveOffer() {
    if ( this.advertiseForm.valid && HelpersOffer.isUpdate() ) {
      Helpers.applySpinner();
      this.update();
    } else if ( this.advertiseForm.valid && !HelpersOffer.isUpdate() ) {
      Helpers.applySpinner();
      this.create();
    } else {
      this.validateForm.validateAllFormFields(this.advertiseForm);
    }
  }

  getForm() {
    let object = Helpers.removeEmptyValues(this.advertiseForm.value);
    if(object.implement){
      object['implement']['type'] = Enum.categoryToBrandImplement[HelpersOffer.offerFromCache().type];
    }

    // if(object.vehicle && !HelpersOffer.isUpdate()){
    if(object.vehicle){
      object['vehicle']['plate'] = object['vehicle']['plate'] ? object['vehicle']['plate'].toUpperCase() : '';
    }
    return object;
  }

  create() {
    const formData = this.getForm();
    this.subscriptions.push(
      this.offersService.create(formData).subscribe(res => {
        Helpers.removeSpinner();
        HelpersOffer.save(new Offer(res));
        this.redirectTo(res.id);
      })
    );
  }

  update() {
    const id = this.route.snapshot.params.id || HelpersOffer.offerFromCache().offer_id;
    const offer = { offer: this.getForm().offer };
    const formData = convertModelToFormData( offer );
    this.offersService.update(id, formData).toPromise().then( res => {
      if ( HelpersOffer.isUpdateBoth() || HelpersOffer.isUpdateVehicle() ) {
        return this.offersService.updateVehicle( id, this.offer.vehicle.id, { vehicle: this.getForm().vehicle } ).toPromise()
      }
    }).then( res => {
      if ( HelpersOffer.isUpdateBoth() || HelpersOffer.isUpdateImplement() ) {
        return this.offersService.updateImplements( id, this.offer.implement.id, { implement: this.getForm().implement } ).toPromise()
      }
    }).then( res => {
      this.redirectTo(id);
    });
  }

  redirectTo(id) {
    Helpers.removeSpinner();
    this.router.navigate([`/classificados/anuncios/fotos/${this.route.snapshot.params.advertiser_id}/${id}`]);
  }

  isVehicle(): boolean {
    const kind = this.offerFromCache.kind;
    return kind === 'vehicular' || kind === 'both';
  }

  isImplement(): boolean {
    const kind = this.offerFromCache.kind;
    return kind === 'implemental' || kind === 'both';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
