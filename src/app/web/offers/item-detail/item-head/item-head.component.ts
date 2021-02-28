import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';
import { ViewersService } from '@clicca-webapp/shared/services/vehicle-selling/viewers-service/viewers.service';
import { getIPs } from '@clicca-webapp/shared/class/ip';
import { ShareButtons } from '@ngx-share/core';


@Component({ preserveWhitespaces: false,
  selector: 'offers-item-head',
  templateUrl: './item-head.component.html',
  styleUrls: ['./item-head.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemHeadComponent implements OnInit {

  @Input() offer;

  private subscriptions: Subscription[] = [];
  private user;
  public showSocial: boolean;
  public current_url = this.router.url;

  constructor(
    private favoritesService: FavoritesService,
    private viewersService: ViewersService,
    private router: Router,
    private route: ActivatedRoute,
    public share: ShareButtons
  ) { }

  ngOnInit() {
    this.getIp();
    this.user = User.fromCache();
  }

  getIp() {
    getIPs( (ip) => {
      if(!this.isLogged()){
        this.setViewers(ip);
      }
    });
  }

  setViewers(ip) {
    const object =  { "viewer": { "ip": ip, "platform": "Web" } }
    if(User.fromCache()){
      object.viewer['user_id'] = User.fromCache().id
    }
    this.subscriptions.push(
      this.viewersService.create(this.route.snapshot.params.id, object).subscribe(res => {
        this.offer.viewers = this.offer.viewers + 1;
      })
    );
  }

  buttonFavorite() {
    if (this.offer.favorited && this.user && !this.isLogged() ) {
      this.deleteFavorite();
    } else if(!this.offer.favorited && this.user && !this.isLogged()) {
      this.saveFavorite();
    } else if(!this.isLogged()) {
      this.router.navigate(['/login'])
    }
  }

  saveFavorite() {
    const object = { "favorite": { "user_id": this.user.id } };
    this.subscriptions.push(
      this.favoritesService.create(this.route.snapshot.params.id, object).subscribe(res => {
        this.offer.favorites = this.offer.favorites + 1;
        this.offer.favorited = true;
        this.offer.favorite_id = res.id;
      })
    );
  }

  deleteFavorite() {
    this.subscriptions.push(
      this.favoritesService.delete(this.route.snapshot.params.id, this.offer.favorite_id).subscribe(res => {
        this.offer.favorites = this.offer.favorites - 1;
        this.offer.favorited = false;
      })
    );
  }

  isLogged(): boolean {
    return User.isLogged() && User.fromCache().id === this.offer.advertiser.user_id;
  }

  simulator() {
    sessionStorage.removeItem('finance');
    this.router.navigate([`/classificados/simular-financiamento/${this.offer.id}`]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
