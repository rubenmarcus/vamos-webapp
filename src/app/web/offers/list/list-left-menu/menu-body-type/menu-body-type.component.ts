import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { BrandsService } from '@clicca-webapp/shared/services/vehicle-selling/brands-service/brands.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-menu-body-type',
  templateUrl: './menu-body-type.component.html',
  styleUrls: ['./menu-body-type.component.scss']
})
export class MenuBodyTypeComponent implements OnInit {

  @Input() typeFilter: FormGroup;
  @Input() type;

  private subscriptions: Subscription[] = [];

  public brands;
  public bodyTypes

  constructor(
    private componentsService: ComponentsService,
    private brandsService: BrandsService,
  ) { }

  ngOnInit() {
    this.getBrand();
    this.getBodyType();
  }

  getBrand(){
    this.subscriptions.push(
      this.brandsService.byKind('truck_body').subscribe(res => {
        this.brands = res;
      })
    );
  }

  getBodyType(){
    this.subscriptions.push(
      this.componentsService.bodyType().subscribe(res => {
        this.bodyTypes = res.objects;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
