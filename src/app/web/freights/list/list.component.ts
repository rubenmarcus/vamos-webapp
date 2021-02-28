import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  public freights = [];
  public preload: boolean = true;
  public pagination;
  public total;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freightsService: FreightsService,
    
  ) { }

  ngOnInit() {
    this.checkGeolocation();
  }

  checkGeolocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {

         const geoParams = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            range: '300km',
          };
 
          let url = `lat=${geoParams.lat}&lon=${geoParams.lon}&range=${geoParams.range}&`
          let urlParams = this.route.snapshot.queryParams;

          this.route.queryParams.subscribe((params)=> {
              if(params['load_state']  || params['load_city'] || params['unload_city']  || params['unload_state'] || params['vehicle_type'] ) {
                this.index(this.params());
              }  else {
                if (params['page']) {
                  let obj = Helpers.encodeURIComponent(this.route.snapshot.queryParams);
                  let urlFinal = url + obj;
                  this.index(urlFinal);
                } else { this.index(url); }
            }
          });
        },
        error => {
            this.index(this.params());

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

  params(){
      let object = this.route.snapshot.queryParams;
      return  Helpers.encodeURIComponent(object);
  }
  
  // Renderiza a lista
  index(params) {
    Helpers.applySpinner();
    this.freights = [];
    this.pagination = null;
    this.preload = true;
   
    this.subscriptions.push(
      this.freightsService.search(params).subscribe(res => {
        this.freights = res.objects;
        this.pagination = res.pagination;
        this.total = res.pagination.total_objects
        this.preload = false;
        Helpers.removeSpinner();
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
