import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-optionals',
  templateUrl: './advertise-optionals.component.html',
  styleUrls: ['./advertise-optionals.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvertiseOptionalsComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public optionals = [];
  public optionalsSelected = [];
  public offer;
  public advertiser_id = this.route.snapshot.params.advertiser_id;
  public offer_id = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentsService: ComponentsService,
    private offersService: OffersService,
  ) { }

  ngOnInit() {
    this.getOffer();
    this.getOptional();
  }

  getOffer(){
    Helpers.applySpinner();
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.show(id).subscribe(res => {
        this.offer = new Offer(res);
        this.optionalsSelected = this.mapOptionals(this.offer.optionals);
        Helpers.removeSpinner();
      })
    );
  }

  isSelected(id){
    // return this.offer.optionals.map(element => {
    //   return element.id;
    // }).indexOf(id) >= 0;
    return this.optionalsSelected.indexOf(id) >= 0;
  }

  mapOptionals(optionals){
    return optionals.map(element => {
      return element.id;
    });
  }

  getOptional(){
    this.subscriptions.push(
      this.componentsService.byType('optional').subscribe(res => {
        this.optionals = res.objects;
      })
    );
  }

  onChange(event, optional){
    if(event.target.checked){
      this.addOptional(optional.id);
    }else{
      this.delOptional(optional.id);
    }
  }

  addOptional(optionalId){
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.addOptional(id, optionalId).subscribe()
    );
  }

  delOptional(optionalId){
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.delOptional(id, optionalId).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
