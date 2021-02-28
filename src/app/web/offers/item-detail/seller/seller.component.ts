import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-item-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SellerComponent implements OnInit {

  @Input() offer;

  constructor() { }

  ngOnInit() {
  }

  about(): string {
    return this.offer.advertiser.about && this.offer.advertiser.about !== '-' ? this.offer.advertiser.about : 'Não informado';
  }

  operatingHours(): string {
    return this.offer.advertiser.operating_hours && this.offer.advertiser.operating_hours !== '-' ? this.offer.advertiser.operating_hours : 'Não informado';
  }

}
