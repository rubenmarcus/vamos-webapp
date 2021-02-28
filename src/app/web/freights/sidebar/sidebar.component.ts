import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { google, Marker } from '@agm/core/services/google-maps-types';
import { MouseEvent } from '@agm/core';
import 'rxjs/add/operator/filter';

import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Subscription } from 'rxjs';
import {noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy {
  private subscriptions: Subscription[] = [];

  public openFilter: boolean = false;

  // Geolocation
  public lat: Number;
  public lng: Number;
  public zoom: Number = 14;
  public dir = null
  public geolocationPosition;

  // Search
  public search;
  public vehicle_types;
  public load_states;
  public unload_states;
  load_cities;
  unload_cities;
  public filterForm: FormGroup;
  public preload: boolean = true;

  public placeholderVehicleType;
  public placeholderState;

  constructor(
    private formBuilder: FormBuilder,
    private freightsService: FreightsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkGeolocation();
    this.createFilterForm();
    this.getLoadStates();
    this.getVehicleTypes();

    this.placeholderState = 'Selecione um estado';
    this.placeholderVehicleType = 'Selecione uma carroceria';
  }

  createFilterForm() {
    let vehicle_type = this.route.snapshot.queryParams["vehicle_type"];
    let load_state = this.route.snapshot.queryParams["load_state"];
    let load_city = this.route.snapshot.queryParams["load_city"];
    let unload_state = this.route.snapshot.queryParams["unload_state"];
    let unload_city = this.route.snapshot.queryParams["unload_city"];

    this.filterForm = this.formBuilder.group({
      search: this.formBuilder.group({
        vehicle_type: [vehicle_type || '' ],
        load_state: [load_state || '' ],
        load_city: [load_city || '' , [noEmoji]],
        unload_state: [unload_state || '' ],
        unload_city: [unload_city || '' , [noEmoji]],
      })
    })
  }

  clickEventHandler(event) {
    const url = this.router.url.split('?').shift();
    let object = this.filterForm.value;

    delete object.value;
    const queryParams = Helpers.removeEmptyValues(object.search);

    this.router.navigate([url], {
      // queryParamsHandling: "merge",
      queryParams: queryParams
    });
  }

  getLoadStates() {
    this.subscriptions.push(
      this.freightsService.filter().subscribe(res => {
        this.load_states = res.load_states
        this.unload_states = res.unload_states
      })
    )
  }

  loadCities(event){
    if(event){
    this.subscriptions.push(
      this.freightsService.citiesload(event).subscribe(res => {
        this.load_cities = res;
      })
      )
    }
  }

  unloadCities(event){
    if(event){
    this.subscriptions.push(
      this.freightsService.citiesunload(event).subscribe(res => {
        this.unload_cities = res;
      })
    )
      }
  }

  getVehicleTypes(){
    this.subscriptions.push(
      this.freightsService.filter().subscribe(res => {
        this.vehicle_types = res.vehicle_types;
      })
    );
  }

  checkGeolocation() {
    // Check browser geolocation
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;

          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.search = {};
        },
        error => {
          this.lat = -23.5486;
          this.lng = -46.6392;
          this.search = {};
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };
  }

  reset() {
    for (let name in this.filterForm.get('search').value) {
      this.filterForm.get('search').get(name).setValue('');
    }
    this.router.navigate([`/fretes`]);
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
