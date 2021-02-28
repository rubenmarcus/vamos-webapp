import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';
import { Subscription } from 'rxjs/Rx';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';


@Component({ preserveWhitespaces: false,
  selector:  'user-favorites-tab-offer',
  templateUrl: './tab-offer.component.html',
  styleUrls: ['./tab-offer.component.scss']
})
export class FavTabOfferComponent implements OnInit {
  public offers = [];
  public paginationOffers;
  public pagination;
  public loaded;

  public preload: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  refreshFavList(){
    if ( this.offers.length === 1 && this.pagination.current_page > 1 ) {
      const page = this.pagination.current_page - 1;
      this.router.navigate([`/perfil/favoritos/classificados`], { queryParams: { page: page } });
    } else{
      this.getFavs(Helpers.encodeURIComponent(this.route.snapshot.queryParams));
    }
  }

  listeningChangeRoutes(): void {
    this.getFavs(Helpers.encodeURIComponent(this.route.snapshot.queryParams));
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          const endpoint = res.url;
          const per_page = 10;
          let params = res.url.split('?').pop();
          params = `${params}&per_page=10`;

         this.getFavs(Helpers.encodeURIComponent(this.route.snapshot.queryParams));

        })
    );
  }

  getFavs(params) {
    Helpers.applySpinner();
    this.offers = [];
    this.preload = true;
    this.subscriptions.push(
      this.favoritesService.list(User.fromCache().id, params).subscribe(res => {
        this.offers = res.objects;
        this.paginationOffers = res.pagination;
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
