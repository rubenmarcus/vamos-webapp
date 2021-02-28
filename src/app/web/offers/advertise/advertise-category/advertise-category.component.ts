import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-category',
  templateUrl: './advertise-category.component.html',
  styleUrls: ['./advertise-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvertiseCategoryComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  public vehicleTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
  ) { }

  ngOnInit() {
    this.createFormPassword();
  }

  createFormPassword(): void {
    this.vehicleTypeForm = this.formBuilder.group({
      offer: this.formBuilder.group({
        kind: ['', [Validators.required]],
      })
    });
  }

  submitSaveOffer(){
    Helpers.applySpinner();
    this.subscriptions.push(
      this.offersService.byUser(this.user.id).subscribe(res => {
        const kind = this.vehicleTypeForm.value.offer.kind;
        const object = { kind: Enum.category[kind], type: kind };
        // if(res.objects.length === 0){
        //   object['firstAccess'] = true;
        // }
        sessionStorage.setItem('offerSelected', JSON.stringify(object));
        this.redirect();
      })
    );
  }

  redirect(){
    this.router.navigate([`/classificados/anuncios/sobre/${this.route.snapshot.params.advertiser_id}`]);
    Helpers.removeSpinner();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
