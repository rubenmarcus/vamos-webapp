import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { Routes, Router, } from '@angular/router';
@Component({ preserveWhitespaces: false,
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OffersComponent implements OnInit {
  contentHeight;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  
  }

}
