import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-card-freight',
  templateUrl: './card-freight.component.html',
  styleUrls: ['./card-freight.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardFreightComponent implements OnInit {

  @Input() freight
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freightsService: FreightsService
  ) { }

  ngOnInit() {

  }

}
