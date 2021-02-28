import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Routes, Router} from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
}
