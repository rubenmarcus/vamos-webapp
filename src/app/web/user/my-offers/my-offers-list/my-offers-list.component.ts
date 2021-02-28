import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, ActivatedRoute, Router, Params, NavigationStart, ActivationEnd, ActivationStart, ActivatedRouteSnapshot } from '@angular/router';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-offers-list',
  templateUrl: './my-offers-list.component.html',
  styleUrls: ['./my-offers-list.component.scss']
})
export class MyOffersListComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public preload: boolean = true;
  public offers = [];
  public pagination;
  public modalChangePlan = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
  ) { }

  ngOnInit() {
    if( !this.isRefresh() ) {
      this.listeningChangeRoutes();
    }
  }

  listeningChangeRoutes(): void {
    const params = this.params(this.router.url);
    this.getOffers(params);
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          const params = this.params(res.url);
          this.getOffers(params);
        })
    );
  }

  params(url){
    const route = url.split('/').pop().split('?').shift();
    let params = {};
    let queryParams = this.route.snapshot.queryParams;
    switch(route){
      case 'ativos' :{
        params = { 'user_id': User.fromCache().id, status: 'published' };
        break;
      }
      case 'inativos' :{
        params = { 'user_id': User.fromCache().id, status: ['draft', 'incomplete', 'sold'] };
        break;
      }
      default: {
        params = { 'user_id': User.fromCache().id, status: ['draft', 'incomplete', 'sold', 'published'] };
        break;
      }
    }
    const object = Object.assign(params, queryParams);
    return Helpers.encodeURIComponent(object);
  }

  getOffers(params){
    Helpers.applySpinner();
    this.offers = [];
    this.preload = true;
    this.subscriptions.push(
      this.offersService.search('offers', params).subscribe(res => {
        this.offers = res.objects;
        this.pagination = res.pagination;
        this.preload = false;
        Helpers.removeSpinner();
      })
    );
  }

  changedStatus(){
    // const params = this.params(this.router.url);
    // this.getOffers(params);
    this.redirectTo(this.router.url);
  }

  isRefresh(): boolean {
    return this.route.snapshot.params.status === 'refresh' ? true : false;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/perfil/meus-anuncios/refresh', { queryParams: {refresh: "1"}, skipLocationChange: true}).then(()=> {
      this.router.navigated = false;
      this.router.navigate([uri]);
    });
  }
  reciverModal() {
    this.modalChangePlan = true;
  }

  closeModal() {
    this.modalChangePlan = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
