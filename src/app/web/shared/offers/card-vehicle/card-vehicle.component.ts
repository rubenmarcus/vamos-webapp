import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';

@Component({ preserveWhitespaces: false,
  selector: 'app-card-vehicle',
  templateUrl: './card-vehicle.component.html',
  styleUrls: ['./card-vehicle.component.scss']
})
export class CardVehicleComponent implements OnInit {

  @Input() offer;

  constructor() { }

  ngOnInit() {
    this.offer = new Offer(this.offer);
    this.offer.images = this.removeEmptyImages(this.offer.images);
  }

  removeEmptyImages(obj) {
    return obj.filter((element, index) => {
      if(element.thumb_url && element.image_url) {
        return element;
      }
    });
  }

}
