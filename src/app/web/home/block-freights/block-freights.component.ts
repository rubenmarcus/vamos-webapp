import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-home-block-freights',
  templateUrl: './block-freights.component.html',
})
export class BlockFreightsComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  freights = [];

  constructor( private freightsService: FreightsService) { }

  ngOnInit() {
    this.getFreightSimilar();
  }

  getFreightSimilar(){
    this.subscriptions.push(
      this.freightsService.search('per_page=4').subscribe(res => {
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
