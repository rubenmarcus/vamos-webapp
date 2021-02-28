import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ preserveWhitespaces: false,
  selector: 'app-menu-negotiation',
  templateUrl: './menu-negotiation.component.html',
  styleUrls: ['./menu-negotiation.component.scss']
})
export class MenuNegotiationComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
