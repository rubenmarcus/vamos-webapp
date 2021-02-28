import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-box-content',
  templateUrl: './box-content.component.html',
  styleUrls: ['./box-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoxContentComponent implements OnInit {

  @Input() title;
  @Input() description;

  constructor() { }

  ngOnInit() {
  }

}
