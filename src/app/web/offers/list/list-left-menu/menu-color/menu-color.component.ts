import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { FormGroup } from '@angular/forms';

@Component({ preserveWhitespaces: false,
  selector: 'app-menu-color',
  templateUrl: './menu-color.component.html',
  styleUrls: ['./menu-color.component.scss']
})
export class MenuColorComponent implements OnInit {

  @Input() typeFilter: FormGroup;

  private subscriptions: Subscription[] = [];
  public colors;

  constructor(
    private componentsService: ComponentsService,
  ) { }

  ngOnInit() {
    this.getColor();
  }

  getColor(){
    this.subscriptions.push(
      this.componentsService.color().subscribe(res => {
        this.colors = res.objects;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
