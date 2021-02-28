import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ preserveWhitespaces: false,
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  public mileage_start;
  public mileage_end;
  public mileage;

  constructor() { }

  ngOnInit() {
    // this.mileage_start = this.typeFilter.controls.mileage.value[0];
    // this.mileage_end = this.typeFilter.controls.mileage.value[1];
    this.mileage = this.typeFilter.controls.mileage.value;
  }

  onChange(event) {
    // this.mileage_start = event[0];
    // this.mileage_end = event[1];
    this.mileage = event;
    // this.typeFilter.controls.mileage.setValue(event);
  }

}
