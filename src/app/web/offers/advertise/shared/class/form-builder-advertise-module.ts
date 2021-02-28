import { NgModule } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HelpersOffer } from "@clicca-webapp/web/offers/advertise/shared/class/helpers-offer";
import { User } from "@clicca-webapp/shared/models/authenticator/user.model";

@NgModule()
export class FormBuilderAdvertiseModule {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  getAdvertiser(advertiser_id, offer): FormGroup{
    const advertiser = offer ? offer.advertiser.id : advertiser_id
    return this.formBuilder.group({
      advertiser_id: [advertiser_id, [Validators.required]],
      user_id: [User.fromCache().id],
      trade: [offer.trade || false],
      aggregate: [offer.aggregate || false],
      description: [offer.description || ''],
      value: [offer.value || '', [Validators.required, Validators.min(0)]],
      status: [this.setStatus(offer)],
      kind: [HelpersOffer.offerFromCache().kind],
    });
  }

  setStatus(offer): string {
    if (HelpersOffer.offerFromCache().firstAccess) {
      return 'incomplete';
    }else if (offer._status) {
      return offer._status;
    }else{
      return 'draft';
    }
  }

}
