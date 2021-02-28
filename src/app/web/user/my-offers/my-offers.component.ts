import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class MyOffersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
