import { Component, OnInit, Input } from '@angular/core';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { Subscription } from 'rxjs';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';


@Component({ preserveWhitespaces: false,
  selector: 'app-home-block-offers',
  templateUrl: './block-offers.component.html',
})
export class BlockOffersComponent implements OnInit {

  @Input() blockTitle;

  private subscriptions: Subscription[] = [];

  public offers = [];

  constructor(
    private offersService: OffersService
  ) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers(){
    this.subscriptions.push(
      this.offersService.search('offers', 'per_page=4&status=published').subscribe(res => {
        res.objects.forEach(element => {
          this.offers.push(new Offer(element));
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
