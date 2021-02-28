import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-left-menu-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  public value_start;
  public value_end;

  constructor() { }

  ngOnInit() {
    // this.value_start = this.typeFilter.controls.value.value[0];
    this.value_end = this.typeFilter.controls.value_end.value;
  }

  onChange(event) {
    this.value_end = event;
    // this.typeFilter.controls.value_end.setValue(event);
    // this.value_start = event[0];
    // this.value_end = event[1];
    // this.typeFilter.controls.value_start.setValue(event[0]);
    // this.typeFilter.controls.value_end.setValue(event[1]);
  }

}
