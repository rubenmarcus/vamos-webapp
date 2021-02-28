import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private enum = {
    Agros: 'agros',
    Bus: 'buses',
    TractorAgricultural: 'tractor_agriculturals',
    conjuto: 'tractors_and_implements',
    TractorUnit: 'tractor_units',
    TruckBody: 'truck_bodies',
    Truck: 'trucks',
  }

  public offer;
  public OffersSimilar = [];
  public OffersUser = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private offersService: OffersService,
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.getOffer();
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.getOffer();
        })
    );
  }

  getOffer(){
    Helpers.applySpinner();
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.show(id).subscribe(res => {
        Helpers.removeSpinner();
        this.offer = new Offer(res);
        sessionStorage.setItem('advertiser_by_user', res.advertiser.user_id);

        if(this.offer._status !== "published" && !this.isLogged()){
          this.router.navigate(['/404']);
        } else if (this.offer._status === "published" && ((this.offer._kind === 'vehicular' && !this.offer.vehicle) || ((this.offer._kind === 'implemental' && !this.offer.implement )) )) {
          this.router.navigate(['/500']);
        }

        if(!this.isLogged()){
          this.getOfferByUser(this.offer.advertiser.user_id);
          this.getOfferSimilar();
        }
      })
    );
  }

  getOfferByUser(user_id){
    const params = `per_page=4&user_id=${user_id}&status=published`
    this.subscriptions.push(
      this.offersService.search('offers', params).subscribe(res => {
        this.OffersUser = res.objects.filter((element) => {
          return element.id !== this.route.snapshot.params.id;
        });
      })
    );
  }

  getOfferSimilar(){
    this.subscriptions.push(
      this.offersService.search(this.setUrl(), this.getParams()).subscribe(res => {
        this.OffersSimilar = res.objects.filter((element) => {
          return element.id !== this.route.snapshot.params.id;
        });
      })
    );
  }

  setUrl(){
    let category;
    if(this.offer.isVehicular() || this.offer.isBoth()){
      category = this.offer.vehicle.type.split('::').pop();
    }else if(this.offer.isImplemental() && this.offer.implement.type === 'Implements::TruckBody'){
      category = 'TruckBody';
    }else{
      category = 'Agros';
    }
    return this.enum[category];
  }

  getParams(){
    let brand_id, model_id;
    if(this.offer.isVehicular() || this.offer.isBoth()){
      brand_id = this.offer.vehicle.brand.id;
      model_id = this.offer.vehicle.model.id;
    }else{
      brand_id = this.offer.implement.brand.id;
      model_id = this.offer.implement.model.id;
    }
    return `per_page=4&brand_id=${brand_id}&model_id=${model_id}&status=published`;
  }

  isLogged():boolean {
    return User.isLogged() && (User.fromCache().id === this.offer.advertiser.user_id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
