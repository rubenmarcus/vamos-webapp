import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-left-menu-condition',
  templateUrl: './condition.component.html',
})
export class ConditionComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
