import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';
import { Subscription } from 'rxjs/Rx';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

@Component({ preserveWhitespaces: false,
  selector: 'user-favorites-tab-all',
  templateUrl: './tab-all.component.html',
  styleUrls: ['./tab-all.component.scss']
})
export class FavTabAllComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public offers = [];
  public freights = [];
  public paginationOffers;
  public paginationFreights;
  public pagination;
  public loaded;

  public preload: boolean = true;

  constructor(
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private router: Router,
    private freightsService: FreightsService,
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.getFavorites();

    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.getFavorites();
        })
    );
  }

  getFavorites() {
    Helpers.applySpinner();

    this.loaded = false;
    const params = Helpers.encodeURIComponent(Object.assign( { per_page: 10 }, this.route.snapshot.queryParams ));

    this.subscriptions.push(
      this.favoritesService.list(User.fromCache().id, params).subscribe(res => {
        this.offers = res.objects;
        this.paginationOffers = res.pagination;
        this.getFavoriteFreights(params);
      })
    );

    // this.favoritesService.list(User.fromCache().id, params).toPromise().then(res => {
    //   this.offers = res.objects;
    //   this.paginationOffers = res.pagination;
    //   return this.freightsService.getFavorites(User.fromCache().id, params).toPromise();
    // }).then(res => {
    //   this.freights = res.objects;
    //   this.paginationFreights = res.pagination;
    //   this.loaded = true;
    //   Helpers.removeSpinner();
    //   this.setPagination();
    // }).catch(error => {
    //   this.offers = [];
    //   this.freights = [];
    //   this.loaded = true;
    //   Helpers.removeSpinner();
    // });
  }

  getFavoriteFreights(params) {
    this.subscriptions.push(
      this.freightsService.getFavorites(User.fromCache().id, params).subscribe(res => {
        this.freights = res.objects;
        this.paginationFreights = res.pagination;
        this.loaded = true;
        this.setPagination();
        Helpers.removeSpinner();
      })
    );
  }

  setPagination() {
    if (this.paginationFreights.total_pages < this.paginationOffers.total_pages ) {
      this.pagination = this.paginationOffers;
    } else if (this.paginationFreights.total_pages === this.paginationOffers.total_pages) {
      this.pagination = this.paginationFreights;
    } else if (this.paginationFreights.total_pages > this.paginationOffers.total_pages ) {
      this.pagination = this.paginationFreights;
    }
  }

  refreshFavList(){
    if ( this.offers.length === 1 && this.pagination.current_page > 1 || this.freights.length === 1 && this.pagination.current_page > 1  ) {
      const page = this.pagination.current_page - 1;
      this.router.navigate([`/perfil/favoritos/todos`], { queryParams: { page: page } });
    } else{
      this.getFavorites();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
