import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
