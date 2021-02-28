import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, NavigationStart, Params, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-offers-list-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class LeftMenuComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public openFilter: boolean = false;
  public isCollapsed = false;
  public type;
  public filterForm: FormGroup;
  public titlePage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.createFormFilter();
    this.type = Enum.typeOffer[this.route.snapshot.params.name];
    this.titlePage = Enum.titlePage[this.route.snapshot.params.name];
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.createFormFilter();
          this.type = Enum.typeOffer[this.route.snapshot.params.name];
          this.titlePage = Enum.titlePage[this.route.snapshot.params.name];
        })
    );
  }

  createFormFilter(): void {
    this.filterForm = this.formBuilder.group({
      type: this.route.snapshot.queryParams.type || '',
      brand_id: this.route.snapshot.queryParams.brand_id || '',
      model_id: this.route.snapshot.queryParams.model_id || '',
      has_truck_body: this.route.snapshot.queryParams.has_truck_body || '',
      body_type_id: this.route.snapshot.queryParams.body_type_id || '',
      state: this.route.snapshot.queryParams.state || '',
      city: this.route.snapshot.queryParams.city || '',
      condition: this.route.snapshot.queryParams.condition || '',
      year: this.route.snapshot.queryParams.year || '',
      trade: this.route.snapshot.queryParams.trade || '',
      color_id: this.route.snapshot.queryParams.color_id || '',
      // value: [[ this.route.snapshot.queryParams.value_start || 0, this.route.snapshot.queryParams.value_end || 0 ]],
      // value: [ this.route.snapshot.queryParams.value_end || 0 ],
      // value_start: this.route.snapshot.queryParams.value_start || '',
      value_start: '0',
      value_end: [ this.route.snapshot.queryParams.value_end || 0 ],
      // mileage: [[ 0, 0 ]],
      mileage: [ this.route.snapshot.queryParams.mileage || 0 ],
      // mileage_value: [ this.route.snapshot.queryParams.mileage || 0 ],
    });
  }

  clickEventHandler(event){
    const url = this.router.url.split('?').shift();
    let object = this.filterForm.value;

    object = this.removeEmpty(object);

    if ( !object.value_end ) {
      delete object.value_start;
      delete object.value_end;
    }

    if ( object.mileage === 0 ) {
      delete object.mileage;
    }

    const queryParams: Params = Object.assign({}, object);
    this.router.navigate([url], { queryParams: queryParams });
  }

  removeEmpty(obj) {
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
  }

  reset() {
    for (let name in this.filterForm.controls) {
      this.filterForm.controls[name].setValue('');
    }
    // this.filterForm.controls.mileage.setValue(0);
    // this.filterForm.controls.value_end.setValue(0);
    this.router.navigate([`/classificados/${this.route.snapshot.params.name}`])
  }

  showFilters() {
    this.openFilter = !this.openFilter;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
