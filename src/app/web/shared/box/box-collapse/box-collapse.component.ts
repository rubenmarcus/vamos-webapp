import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-box-collapse',
  templateUrl: './box-collapse.component.html',
  styleUrls: ['./box-collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoxCollapseComponent implements OnInit {
  @Input() Title;
  public isCollapsed: any ;

  constructor() { }

  ngOnInit() {
  }

}
