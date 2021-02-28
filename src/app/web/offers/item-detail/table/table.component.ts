import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-item-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
