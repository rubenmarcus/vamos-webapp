import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  public offers = [];
  public freights = [];
  contentHeight;

  constructor(
    private offersService: OffersService,
    private freightsService: FreightsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.contentHeight  = this.route.snapshot.data['contentHeight'];
    this.getOffers();
    this.getFreightSimilar();
  }

  getOffers() {
    this.subscriptions.push(
      this.offersService.search('offers', 'per_page=4&status=published').subscribe(res => {
        this.offers = res.objects;
      })
    );
  }

  getFreightSimilar() {
    this.subscriptions.push(
      this.freightsService.search('per_page=4&status=published').subscribe(res => {
        this.freights = res.objects;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
