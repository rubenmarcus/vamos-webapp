import { Component, OnInit, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';

// declare var google:any;

@Component({ preserveWhitespaces: false,
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NetworkComponent implements OnInit {

  private changeLat: number;
  private changeLng: number;

  private latitude: number = -23.5486;
  private longitude: number = -46.6392;

  public lat: Number = -23.5486;
  public lng: Number = -46.6392;
  public zoom: Number = 14;
  public isSearch = false;
  public dir = null
  newload = false;
  public loading: boolean = false;
  public search = {};
  public geolocationPosition;
  public markers = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkGeolocation();
  }

  checkGeolocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;

          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.loading = true;
        },
        error => {
          this.loading = false;
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              Alert.error('Por favor, habilite a geolocalização no seu navegador.');
              this.router.navigate([sessionStorage.getItem('previous_url') || '/']);

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

  // recebendo parametros de busca
  reciverSearch(search){
    if(search.query === ''){
      this.newload = false;
      this.isSearch = false;
      this.checkGeolocation();
    } else {
      this.loading = false;
      this.newload = true;
      this.search = search;
      this.isSearch = true;
      if(this.dir){
        this.dir.visible = false;
      }

    }
  }

  // recebendo os pontos
  reciverPoints(points){
    this.markers = [];
    points.forEach(element => {
      if ( element.address ) {
        this.markers.push(
          {
            lat: Helpers.stringToNumber(element.address.latitude),
            lng: Helpers.stringToNumber(element.address.longitute),
            iconUrl: '/assets/img/pin-blue.png',
          }
        )
      }
    });
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  // traçando rota
  reciverRoute(route){
    this.markers = [];
    this.dir = {
      origin: { lat: this.geolocationPosition.coords.latitude, lng: this.geolocationPosition.coords.longitude },
      destination: { lat: Helpers.stringToNumber(route.address.latitude), lng: Helpers.stringToNumber(route.address.longitute) },
      visible: true
    }
  }

  reciverPosition(element){
    this.setPinBlue();
    if(element.type && this.markers.length > 0){
      this.markers[element.position].iconUrl = '/assets/img/pin-green.png';
      this.lat = this.markers[element.position].lat;
      this.lng = this.markers[element.position].lng;
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

}
