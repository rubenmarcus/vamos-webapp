import { Component, OnInit, Input } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() name;
  @Input() icon;

  constructor() { }

  ngOnInit() {
  }

}
