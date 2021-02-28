import { Component, OnInit , ViewEncapsulation, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';
import { Enum } from '@clicca-webapp/shared/class/enum';

@Component({ preserveWhitespaces: false,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public preload: boolean = true;
  public pagination;
  public offers = [];
  public menu = [
    {
      router: '/classificados/caminhoes',
      name: 'Caminhões'
    },
    {
      router: '/classificados/cavalo',
      name: 'Cavalo'
    },
    {
      router: '/classificados/conjuto',
      name: 'Conjunto'
    },
    {
      router: '/classificados/carroceria',
      name: 'Carroceria'
    },
    {
      router: '/classificados/onibus',
      name: 'Ônibus e Utilitários'
    },
    {
      router: '/classificados/tratores',
      name: 'Tratores'
    },
    {
      router: '/classificados/maquinas',
      name: 'Máquinas e Implementos'
    }
  ];

  constructor(
    private offersService: OffersService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.getOffersSearch(this.endpoint(this.router.url), this.params());

    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.getOffersSearch(this.endpoint(res.url), this.params());
        })
    );
  }

  endpoint(url){
    return Enum.typeOffer[ this.router.url.split('/').pop().split('?').shift() ];
  }

  params(){
    let queryParams = this.route.snapshot.queryParams;
    const object = Object.assign({ status: 'published' }, queryParams);
    return Helpers.encodeURIComponent(object);
  }

  getOffersSearch(name, params){
    Helpers.applySpinner();
    this.pagination = null;
    this.offers = [];
    this.preload = true;
    this.subscriptions.push(
      this.offersService.search(name, params).subscribe(res => {
        this.offers = res.objects;
        this.pagination = res.pagination;
        this.preload = false;
        Helpers.removeSpinner();
      })
    );
  }

  simulator() {
    sessionStorage.removeItem('finance');
    this.router.navigate(["/classificados/simular-financiamento"]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

