import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-menu-year',
  templateUrl: './menu-year.component.html',
  styleUrls: ['./menu-year.component.scss']
})
export class MenuYearComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  public years = Helpers.datePeriod();

  constructor() { }

  ngOnInit() {
    // this.years = this.range(1950, new Date().getFullYear() + 1);
  }

  range(start, end) {
    const length = (end - start) + 1;
    return Array(length).fill(0).map(function(_, index) {
      return start + index;
    }).reverse();
  }

}
