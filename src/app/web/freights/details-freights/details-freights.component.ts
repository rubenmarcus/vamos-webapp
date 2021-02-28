import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ShareButtons } from '@ngx-share/core';
import { getIPs } from '@clicca-webapp/shared/class/ip';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';


@Component({ preserveWhitespaces: false,
  selector: 'app-details-freights',
  templateUrl: './details-freights.component.html',
  styleUrls: ['./details-freights.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsFreightsComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private session: boolean = new SessionChecker().isSessionStarted;
  private user;
  public freight_desc;
  public freight;
  public freightCoords;
  public freightsSimilar = [];
  public phoneVisible: boolean = true;
  public showSocial: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private freightsService: FreightsService,
    public share: ShareButtons
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
    

  }

  // Observa mudanças na rota
  listeningChangeRoutes(): void {
    this.getFreight();

    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.getFreight();
        })
    );

  }

  getIp() {
    getIPs( (ip) => {
      this.setViewers(ip);
    });
  }

  setViewers(ip) {
    const object =  { "viewer": { "ip": ip, "platform": "Web" } }
    if(User.fromCache()){
      object.viewer['user_id'] = User.fromCache().id
    }
    this.subscriptions.push(
      this.freightsService.viewers(this.route.snapshot.params.id, object).subscribe(res => {
        this.freight.viewers = this.freight.viewers + 1;
      })
    );
  }

  showPhone(element, text) {
    if ( this.freight.url ) {
      window.open(this.freight.url, '_blank');
    } else if ( this.phoneVisible ) {
      element.textContent = text;
      this.phoneVisible = false;
    } else {
      element.textContent = 'Tenho interesse';
      this.phoneVisible = true;
    }
  }

  getFreight(){
    Helpers.applySpinner();
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.freightsService.show(id).subscribe(res => {
        this.getIp();
        this.freight = res;
        if(res.price_per_kilometers !== undefined) {
          this.freight_desc =  `Olá! Tenho interesse no seu frete de ${this.freight.load_city} - ${this.freight.load_state}  p/ ${this.freight.unload_city} - ${this.freight.unload_state} , com valor ${this.freight.price_per_kilometers}`;

        } else {

          this.freight_desc =  `Olá! Tenho interesse no seu frete de ${this.freight.load_city} - ${this.freight.load_state}  p/ ${this.freight.unload_city} - ${this.freight.unload_state}`;

        }

        this.getFreightSimilar();
        Helpers.removeSpinner();
      })
    );
  }

  getFreightSimilar(){
    this.subscriptions.push(
      this.freightsService.search(this.getParams()).subscribe(res => {
        this.freightsSimilar = res.objects.filter((element) => {
          return element.id !== this.route.snapshot.params.id;
        });
      })
    );
  }

  getParams() {
    let unload_city
    let body_types
    unload_city = this.freight.unload_city
    body_types = this.freight.body_types
    return `unload_city=${unload_city}&body_types=${body_types}&per_page=4&status=published`;
  }

  saveFavorite() {
    if (this.session && !this.freight.favorited) {
      this.addFavorite();
    } else if (this.session && this.freight.favorited) {
      this.deleteFavorite();
    } else {
      this.router.navigate(['/login']);
    }
  }

  addFavorite() {
    const object = { 'favorite': { 'user_id': User.fromCache().id } };
    this.subscriptions.push(
      this.freightsService.save(this.freight.id, object).subscribe(res => {
        this.freight.favorited = true;
        this.freight.favorite_id = res.id;
        this.freight.favorites++;
      })
    );
  }

  deleteFavorite() {
    this.subscriptions.push(
      this.freightsService.delete(this.freight.id, this.freight.favorite_id ).subscribe(res => {
        this.freight.favorited = false;
        this.freight.favorite_id = null;
        this.freight.favorites--;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
