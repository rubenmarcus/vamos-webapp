import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InternalServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
