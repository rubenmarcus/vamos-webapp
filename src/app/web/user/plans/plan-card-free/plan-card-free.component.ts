import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plan-card-free',
  templateUrl: './plan-card-free.component.html',
  styleUrls: ['./plan-card-free.component.scss']
})
export class PlanCardFreeComponent implements OnInit {
  @Input() expiration;
  constructor() { }

  ngOnInit() {
  }

}
