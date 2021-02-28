import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'home-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
