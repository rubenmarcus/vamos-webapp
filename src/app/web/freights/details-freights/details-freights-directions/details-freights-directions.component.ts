import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-details-freights-directions',
  templateUrl: './details-freights-directions.component.html',
  styleUrls: ['./details-freights-directions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsFreightsDirectionsComponent implements OnInit {
  @Input() freight;

  public lat: Number;
  public lng: Number;
  public zoom: Number = 14;

  public dir = null

  constructor() { }

  ngOnInit() {
    this.getDirections()
  }

  getDirections() {
    this.dir = {
      origin: { lat: Number(this.freight.load_coordinates[0]), lng: Number(this.freight.load_coordinates[1]) },
      destination: { lat: Number(this.freight.unload_coordinates[0]), lng: Number(this.freight.unload_coordinates[1]) },
      visible: true
    }
  }}
