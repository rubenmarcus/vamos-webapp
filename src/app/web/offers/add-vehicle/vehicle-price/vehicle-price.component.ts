import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-vehicle-price',
  templateUrl: './vehicle-price.component.html',
  styleUrls: ['./vehicle-price.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VehiclePriceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
