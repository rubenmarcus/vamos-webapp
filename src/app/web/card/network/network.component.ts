import { Component, OnInit, ViewEncapsulation, SimpleChanges, OnDestroy } from '@angular/core';
import { TemService } from '@clicca-webapp/shared/services/tem-service/tem-service.service';
import { Subscription } from 'rxjs/Rx';
import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
@Component({ preserveWhitespaces: false,
  selector: 'card-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CardNetworkComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public states = [];
  private latitude = -12.9496626;
  private longitude = -38.4900401;


  private latCircle = -12.9496626;
  private longCircle = -38.4900401;

  public userspecialties = [];
  public lat: number;
  public lng: number;
  public authToken;
  public positionMap;
  public zoom: Number = 12;
  public addDetail;
  public clinicId;
  public dir = null;
  drugstore;
  addressClicked = false;
  mapDrag = true;
  public search;
  public geolocationPosition;
  public markers = [];
  public listType;
  loaded = false;

  constructor(
    private temService: TemService,
  ) { }


  ngOnInit() {
    this.getToken();
    this.checkGeolocation();
  }

  getToken() {
    this.subscriptions.push(
      this.temService.TemNewtwork().subscribe(res => {
        // console.log('Token', res);
        const parsedToken = JSON.parse(res._body);
        // console.log('Token Passed 1' , parsedToken.access_token );
        this.authToken = parsedToken.access_token;
        this.specialties(parsedToken.access_token);
      })
    );
  }

  specialties(token) {
    this.subscriptions.push(
      this.temService.getSpecialties(token).subscribe(res => {
        this.userspecialties = res.body;
       // console.log('Specialities' , res.body);
      })
    );
  }

  centerMap(){

    this.addressClicked = false;
    this.zoom = 12;
  }

  
setMap(coords){
  //console.log('Pego aqui');
  this.lat = coords.lat;
  this.lng = coords.long;
  this.latitude = coords.lat;
  this.longitude = coords.long;
  this.latCircle = coords.lat;
  this.longCircle = coords.long;
  this.search = {};
  this.mapDrag = false;
  this.geolocationPosition = {
    lat: coords.lat,
    long: coords.long
  };
  this.zoom = 12;
}

  checkGeolocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {

          this.geolocationPosition = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          };

          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.latCircle = position.coords.latitude;
          this.longCircle = position.coords.longitude;

          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.search = {};
        },
        error => {

          this.geolocationPosition = {
            lat: -23.5486,
            long: -46.6392
          };

           this.lat = -23.5486;
           this.lng = -46.6392;

          this.search = {};
          switch (error.code) {
            case 1:
              // console.log('Permission Denied');
              break;
            case 2:
             // console.log('Position Unavailable');
              break;
            case 3:
             // console.log('Timeout');
              break;
          }
        }
      );
    };
  }

  getType(type) {
    this.listType = type;
    if (type === 'clinics'){
      this.zoom = 12;
    } else {
      this.zoom = 12;
    }
  }
  // recebendo parametros de busca
  reciverSearch(search) {
    this.search = search;
    if ( this.dir ) {
      this.dir.visible = false;
    }
  }

  getClinicId(id) {
    this.search = id;
  }

  // recebendo os pontos
  reciverPoints(points) {
    this.markers = [];
    if (this.listType === 'drugstore') {
       this.drugstore = true;
        if (points.length) {
        points.forEach(element => {
          if (element) {
            this.markers.push({
              lat: Helpers.stringToNumber(element.latitude),
              lng: Helpers.stringToNumber(element.longitude),
              iconUrl: '/assets/img/pin-blue.png',
              id: element.id,
            });
          }
        });
      }
    } else {
      this.drugstore = false;
      if (points.length) {
        points.forEach(element => {
          if (element) {
            this.markers.push({
              lat: element.latitude,
              lng: element.longitude,
              iconUrl: '/assets/img/pin-blue.png',
              id: element.id,
            });
          }
        });
      }
    }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

 

  // traçando rota
  reciverRoute(route){
    this.markers = [];
      if (this.listType === 'drugstore') {
        this.drugstore = true;
      this.dir = {
        origin: { lat: this.geolocationPosition.lat, lng: this.geolocationPosition.long },
        destination: { lat: Helpers.stringToNumber(route.latitude), lng: Helpers.stringToNumber(route.longitude) },
        visible: true
      }
    } else {
      this.drugstore = false;
      this.dir = {
        origin: { lat: this.geolocationPosition.lat, lng: this.geolocationPosition.long },
        destination: { lat: route.latitude, lng: route.longitude },
        visible: true
      }
    }
  }
removeAddressBox() {
  this.addressClicked = false;
}
receiveAddress(address){
  this.addressClicked = true;
  this.addDetail = address;
 // console.log('Address' , address , this.addressClicked);
}

  reciverPosition(element){
    this.setPinBlue();


    if(element.type && this.markers.length > 0){
      this.markers[element.position].iconUrl = '/assets/img/pin-green.png';
      this.lat = this.markers[element.position].lat;
      this.lng = this.markers[element.position].lng;

      this.zoom = 16;
    } else {
      this.lat = this.latitude;
      this.lng = this.longitude;
    }

  
  }

  setPinBlue() {
    this.markers = this.markers.map(element => {
      element.iconUrl = '/assets/img/pin-blue.png';
      return element;
    });
  }

  setCenter(markerObj) {
    this.lat = markerObj.latitude;
    this.lng = markerObj.longitude;
  }


  
  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
