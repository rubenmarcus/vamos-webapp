  import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
  import { NetworkService } from '@clicca-webapp/shared/services/network-service/network.service';
  import { Subscription } from 'rxjs';
  import { Helpers } from '@clicca-webapp/shared/class/helpers';
  import { TemService } from '@clicca-webapp/shared/services/tem-service/tem-service.service';

  @Component({ preserveWhitespaces: false,
    selector: 'card-network-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
  })
  export class CardNetworkListComponent implements OnInit , OnChanges{

  
    private subscriptions: Subscription[] = [];

    @Input() search;
    @Input() coords;
    @Input() type;
    @Input() token;
    @Input() clinicID;
    @Output() traceRoute = new EventEmitter;
    @Output() points = new EventEmitter;
    @Output() position = new EventEmitter;
    @Output() address = new EventEmitter;
    @Output() center = new EventEmitter;
    
    public noclinics = false;


    private establishmentPosition:any = {};
    public isCollapsed = true;
    public selclinics;
    public establishments = [];
    public noestablishment = false;

    constructor(
      private networkService: NetworkService,
      private temService: TemService,
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

      if (this.type === 'drugstore') {
        if (!Helpers.isEmpty(this.search)) {
          this.getSearch(changes.search.currentValue);
          this.noestablishment = false;
        
        } else {
          this.noestablishment = false;
          this.getSearch('');
        }
      } else {
        if (this.search.query === ''){
          this.selclinics = true;
          this.establishments = [];
        } else {
          this.getSearch(changes.search.currentValue);
        }

      }
    }

    getSearch(search) {
      Helpers.applySpinner();
      if (Helpers.isEmpty(this.search)) {
        const obj =  { latitude: `${this.coords.lat}`, longitude: `${this.coords.long}`, radius: 6 };
        this.getItems(obj);
      } else {
        const obj =  { latitude: `${this.coords.lat}`, longitude: `${this.coords.long}`, radius: 30 , description: `${this.search.query}` };
        this.getItems(obj);
       }
    }

    getItems(obj) {
      if (this.type === 'drugstore') {
        this.subscriptions.push(
          this.temService.drugstore(obj).subscribe(res => {
            this.establishments = res.data;
            this.noclinics = false;
            this.points.emit(this.establishments);
            Helpers.removeSpinner();
          })
        );
      } else {
        this.subscriptions.push(
          this.temService.getClinics(this.token, this.search.query, obj).subscribe(res => {
            if (res.body.length > 0) {
              this.establishments = res.body;
              this.points.emit(this.establishments);
              this.selclinics = false;
            } else {
              this.establishments = [];
               this.noclinics = true;
               this.points.emit(this.establishments);
            }
            Helpers.removeSpinner();
          })
        );
      }
    }


    sendRoute(establishment) {
      this.traceRoute.emit(establishment);
    }

    activateClass(establishment, i) {
      this.closeItem();
      if ( this.establishmentPosition.position === i ) {
        // this.position.emit({});
        // this.establishmentPosition = {};
        // this.address.emit(establishment);
        this.center.emit();
        console.log('aqui');
      } else {
        establishment.active = true;
        const object = { position: i, type: establishment };
        this.establishmentPosition = object;
        this.position.emit(object);
        this.address.emit(establishment);
      }
    }

    closeItem() {
      this.establishments = this.establishments.map((element, index) => {
        element.active = false;
        return element;
      });
    }

    distance(address, unit) {
      const lat1 = this.coords.lat;
      const lon1 = this.coords.long;
      const lat2 = Number(address.latitude);
      const lon2 = Number(address.longitute);

      const radlat1 = Math.PI * lat1/180
      const radlat2 = Math.PI * lat2/180
      const theta = lon1-lon2
      const radtheta = Math.PI * theta/180
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return Math.floor(dist);
    }

    getDistanceFromLatLonInKm(address) {
      const myLocation = { lat: this.coords.lat, lng: this.coords.long };
      address.latitude = Number(address.latitude);
      address.longitude = Number(address.longitute);

      const R = 6371,
      dLat = this.deg(myLocation.lat - address.latitude),
      dLng = this.deg(myLocation.lng - address.longitude),
      a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
          + Math.cos(this.deg(address.latitude))
          * Math.cos(this.deg(address.latitude))
          * Math.sin(dLng / 2) * Math.sin(dLng / 2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      // return ((R * c *1000).toFixed());
      return Math.floor( R * c *1000 );
    }

    deg(deg) {
      return deg * (Math.PI / 180);
    };

    ngOnDestroy() {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }


  }
