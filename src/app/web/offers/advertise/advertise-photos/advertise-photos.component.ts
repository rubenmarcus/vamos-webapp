import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';
import { HelpersOffer } from '@clicca-webapp/web/offers/advertise/shared/class/helpers-offer';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-photos',
  templateUrl: './advertise-photos.component.html',
  styleUrls: ['./advertise-photos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvertisePhotosComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  private currentPlan = this.route.snapshot.data.currentPlan;

  public offer;
  public images = [];
  public counter;
  public advertiser_id = this.route.snapshot.params.advertiser_id;
  public offer_id = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
  ) { }

  ngOnInit() {
    this.getOffer();
    this.isPlan();
  }

  isPlan() {
    this.counter = Array(8).fill(0);
    // if ( this.currentPlan && this.currentPlan.status === 'active' ) {
    //   this.counter = Array(this.currentPlan.offer_plan.photos).fill(0);
    // } else {
    //   this.counter = Array(1).fill(0);
    // }
  }

  getOffer(){
    Helpers.applySpinner();
    const id = this.offer_id;
    this.subscriptions.push(
      this.offersService.show(id).subscribe(res => {
        this.images = res.images;
        Helpers.removeSpinner();
      })
    );
  }

  fileChange(event, i) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      const obj = { thumb_url: '/assets/img/spinner/spinner-1s-70px.gif', preloader: true };
      this.images[i] = obj;
      formData.append('image[image]', file);
      this.create(formData, i);
    }
  }

  create(formData, i){
    this.subscriptions.push(
      this.offersService.addPhoto(this.offer_id, formData).subscribe(res => {
        this.images[i] = res;
      })
    );
  }

  buttonDelete(id, item){
    this.subscriptions.push(
      this.offersService.delPhoto(this.offer_id, item.id).subscribe(res => {
        this.images[id] = {};
      })
    );
  }

  isFirstAccess():boolean {
    return !HelpersOffer.isFirstAccess();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
