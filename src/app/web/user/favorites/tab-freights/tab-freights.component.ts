import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';


@Component({ preserveWhitespaces: false,
  selector:  'user-favorites-tab-freights',
  templateUrl: './tab-freights.component.html',
  styleUrls: ['./tab-freights.component.scss']
})
export class FavTabFreightsComponent implements OnInit, OnDestroy {


  private subscriptions: Subscription[] = [];

  public offers = [];
  public freights = [];
  public paginationOffers;
  public paginationFreights;
  public pagination;

  public preload: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freightsService: FreightsService,) { }

  ngOnInit() {

    this.listeningChangeRoutes();
  }


  listeningChangeRoutes(): void {

    this.getFreights(Helpers.encodeURIComponent(this.route.snapshot.queryParams));

    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          const endpoint = res.url;
          const per_page = 10;
          let params = res.url.split('?').pop();
          params = `${params}&per_page=10`;

         this.getFreights(Helpers.encodeURIComponent(this.route.snapshot.queryParams));

        })
    );
  }

  refreshFavList(){
    if ( this.freights.length === 1 && this.pagination.current_page > 1 ) {
      const page = this.pagination.current_page - 1;
      this.router.navigate([`/perfil/favoritos/fretes`], { queryParams: { page: page } });
    } else{
      this.getFreights(Helpers.encodeURIComponent(this.route.snapshot.queryParams));
    }
  }


  getFreights(params) {
    Helpers.applySpinner();

    this.subscriptions.push(
      this.freightsService.getFavorites(User.fromCache().id, params).subscribe(res => {
        this.freights = res.objects;
        this.paginationFreights = res.pagination;
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
