import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({ preserveWhitespaces: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RegisterComponent implements OnInit {
  hidePerson = true;
  hideCompany = false;

  hideRadioButton = true;

  constructor(
    private titleService: Title,
    ) {}

  ngOnInit() {
  }

  showPJ() {
    this.hideCompany = true;
    this.hidePerson = false;
  }

  showPF() {
    this.hidePerson = true;
    this.hideCompany = false;
  }

  hideRadio(e) {
    this.hideRadioButton = e;
  }
}
