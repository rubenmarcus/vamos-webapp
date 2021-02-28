import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter, ViewEncapsulation, HostListener } from '@angular/core';
import { NetworkService } from '@clicca-webapp/shared/services/network-service/network.service';
import { Subscription } from 'rxjs';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-netwotk-list',
  templateUrl: './netwotk-list.component.html',
  styleUrls: ['./netwotk-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NetwotkListComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() search;
  @Input() isSearch;
  @Input() coords;
  @Output() traceRoute = new EventEmitter;
  @Output() points = new EventEmitter;
  @Output() position = new EventEmitter;

  private establishmentPosition:any = {};
  public isCollapsed = true;

  public establishments = [];
  public network_id = this.route.snapshot.queryParams.network_id;

  public pagination:any = {};

  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getSearch(changes.search.currentValue);
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    const scrollLimit = $event.target.scrollHeight - $event.target.offsetHeight;
    if ( $event.target.scrollTop === scrollLimit && this.pagination.current_page !== this.pagination.total_pages ) {
      this.getSearch({});
    }
  }

  getSearch(search) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.networkService.search(this.queryParams(search)).subscribe(res => {
        res.objects.forEach(element => {
          this.establishments.push(element);
        });

        this.pagination = res.pagination;
        this.points.emit(this.establishments);

        const position = this.filterPosition(this.establishments, this.network_id);

        if (position >= 0) {
          this.establishmentPosition = {};
          this.activateClass(this.establishments[position], position);
        }
        Helpers.removeSpinner();
      })
    );
  }

  filterPosition(establishments, network_id) {
    return establishments.findIndex(i => i.id === network_id);
  }

  queryParams(query) {

   // console.log('Search', this.search);
    const pagination = this.pagination['current_page'] ? this.pagination['current_page'] + 1 : 1;
    let object = {  };
    object = { page: pagination };
    if(!this.isSearch){
      object = { location: `${this.coords.coords.latitude},${this.coords.coords.longitude}`, page: pagination };
    } else { 
      object = { query: `${this.search.query}`, page: pagination };
    
      console.log(object);}
    return object;
  }


  sendRoute(establishment) {
    this.traceRoute.emit(establishment);
  }

  activateClass(establishment, i) {
    this.closeItem();
    if ( this.establishmentPosition.position === i ) {
      this.position.emit({});
      this.establishmentPosition = {};
    } else {
      establishment.active = true;
      const object = { position: i, type: establishment };
      this.establishmentPosition = object;
      this.position.emit(object);
      this.network_id = establishment.id;
    }
  }

  closeItem() {
    this.establishments = this.establishments.map((element, index) => {
      element.active = false;
      return element;
    });
  }

  distance(address, unit) {
    const lat1 = this.coords.coords.latitude;
    const lon1 = this.coords.coords.longitude;
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
    const myLocation = { lat: this.coords.coords.latitude, lng: this.coords.coords.longitude };
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
