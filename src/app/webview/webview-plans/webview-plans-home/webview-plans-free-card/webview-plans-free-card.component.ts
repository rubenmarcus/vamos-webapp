import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-webview-plans-free-card',
  templateUrl: './webview-plans-free-card.component.html',
  styleUrls: ['./webview-plans-free-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebviewPlansFreeCardComponent implements OnInit {
  @Input() expiration;
  constructor() { }

  ngOnInit() {
  }

}
