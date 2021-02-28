import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Routes, Router} from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'user-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
