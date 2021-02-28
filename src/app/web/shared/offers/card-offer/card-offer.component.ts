import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { HelpersOffer } from '@clicca-webapp/web/offers/advertise/shared/class/helpers-offer';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardOfferComponent implements OnInit {
  @Input() offer;
  @Input() byUser:boolean = false;
  @Output() refreshFavList = new EventEmitter();
  @Output() changedStatus = new EventEmitter();
  @Output() openModal = new EventEmitter();

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  public currentPlan = this.route.snapshot.data.currentPlan;

  public offerActive = this.route.snapshot.data.vehicleActive;

  public session: boolean;

  public showMenu: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private offersService: OffersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setSession();
    this.offer = new Offer(this.offer);
    this.offer.images = this.removeEmptyImages(this.offer.images);

    this.currentPlan = this.route.snapshot.data.currentPlan;
    this.offerActive = this.route.snapshot.data.vehicleActive;
  }

  private setSession() {
    const helper = new SessionChecker();
    this.session = helper.isSessionStarted;
    if (this.session) {
      this.user = User.fromCache();
    }
  }

dateTransform(date){
  
  return new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'numeric',day: 'numeric'}).format(date);
}

  saveFavorite() {
    if (this.session && !this.isLogged()) {
      const object = { 'favorite': { 'user_id': User.fromCache().id } };
      this.subscriptions.push(
        this.favoritesService.create(this.offer.id, object).subscribe(res => {
          this.offer.favorited = true;
          this.offer.favorite_id = res.id;
        })
      );
    } else if (!this.isLogged()) {
      this.router.navigate(['/login']);
    }
  }

  deleteFavorite() {
    this.subscriptions.push(
      this.favoritesService.delete(this.offer.id, this.offer.favorite_id).subscribe(res => {
        this.offer.favorited = false;
        this.refreshFavList.emit(true);
      })
    );
  }

  changeStatus(status){
    if ( status === 'published' && this.isOffersLimit() && ( this.isSignFree() || this.isSignPlanActive() ) ) {
      this.openModal.emit();
    } else if ( status === 'published' && ( !this.isSignFree() && !this.isSignPlanActive() ) ) {
      this.router.navigate(['/perfil/planos']);
    } else {
      Helpers.applySpinner();
      this.subscriptions.push(
        this.offersService.changeStatus(this.offer.id, status).subscribe(res => {
          setTimeout(() => {
            this.changedStatus.emit();
          }, 500);
        })
      );
    }
  }

  isPublished(): boolean {
    return this.offer._status === 'published';
  }

  isAarchived(): boolean {
    return this.offer._status !== 'published' && this.offer.images.length > 0;
  }

  isIncompleted(): boolean {
    return (this.offer._status === 'incomplete' || this.offer._status === 'draft') && (this.offer.images.length === 0) || (this.offer.value === 0);
  }

  isSold(): boolean {
    return this.offer._status === 'sold';
  }

  offerStatus() {
    if ( this.isIncompleted() ) {
      return 'Cadastro incompleto';
    } else if ( this.isPublished() ) {
      return this.dateTransform(this.offer.created_at);
    } else if ( this.isSold() ) {
      return 'Anúncio vendido';
    } else if ( this.isAarchived() ) {
      return 'Anúncio desativado';
    }
  }

  showClass(): string {
    if ( this.isIncompleted() ) {
      return 'incomplete';
    } else if ( this.isSold() ) {
      return 'sold';
    } else if ( this.isAarchived() ) {
      return 'inactive';
    }
  }

  openMenu() {
    this.showMenu = !this.showMenu;
  }

  redirect(){
    HelpersOffer.delete();
    HelpersOffer.save(this.offer);
    this.router.navigate([`/classificados/anuncios/sobre/${this.offer.advertiser.id}/${this.offer.id}`]);
  }

  removeEmptyImages(obj) {
    return obj.filter((element, index) => {
      if(element.thumb_url && element.image_url) {
        return element;
      }
    });
  }

  isLogged(): boolean {
    return User.isLogged() && User.fromCache().id === this.offer.advertiser.user_id;
  }

  convertDate(date) {
    let expiresAt = date.split('-');
    return new Date(expiresAt[0], expiresAt[1] - 1, expiresAt[2]);
  }

  isSignFree(): boolean {
    const user = User.fromCache();
    if( !user.offers_subscription_expires_at && user.offers_subscription_available ) {
      // console.log('esta disponivel para assinar');
      return false;
    } else if ( user.offers_subscription_available && this.convertDate(user.offers_subscription_expires_at) > new Date() ) {
      // console.log('verificando a expiração, posso publicar');
      return true;
    } else if (!user.offers_subscription_available) {
      // console.log('já assinou, não posso publicar por aqui');
      return false;
    }
  }

  isSignPlanActive(): boolean {
    return this.currentPlan.status === 'active' ? true : false;
  }

  isOffersLimit(): boolean {
    return (this.isSignFree() && this.offerActive.pagination.total_objects < 2000) ||
            (this.currentPlan['status'] === 'active' && this.currentPlan['offer_plan']['offers'] > this.currentPlan['published_offers']) ? false : true;
  }

  isPlan(): boolean {
    return this.currentPlan ? true : false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
