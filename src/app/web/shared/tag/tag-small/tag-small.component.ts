import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-tag-small',
  templateUrl: './tag-small.component.html',
  styleUrls: ['./tag-small.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagSmallComponent implements OnInit {

  @Input() name;
  @Input() icon;

  constructor() { }

  ngOnInit() {
  }

}
