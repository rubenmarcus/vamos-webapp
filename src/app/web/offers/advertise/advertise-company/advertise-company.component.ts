import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdvertisersService } from '@clicca-webapp/shared/services/vehicle-selling/advertisers-service/advertisers.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-company',
  templateUrl: './advertise-company.component.html',
  styleUrls: ['./advertise-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvertiseCompanyComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  private user = User.fromCache();
  public companies = [];
  public pagination;
  public preload = true;

  constructor(
    private advertisersService: AdvertisersService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.getCompany(this.params());

    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.getCompany(this.params());
        })
    );
  }

  params(){
    let queryParams = this.route.snapshot.queryParams;
    const object = Object.assign({ status: 'published' }, queryParams);
    return Helpers.encodeURIComponent(object);
  }

  saveCompany(company){
    Helpers.removeSpinner();
    this.router.navigate([`/classificados/anuncios/categoria/${company.id}`]);
  }

  getCompany(params){
    Helpers.applySpinner();
    this.subscriptions.push(
      this.advertisersService.byUser(this.user.id, params).subscribe(res => {
        if ( res.objects.length === 0 ) {
          this.getUser();
        } else if ( this.user.profile_type === 'Person' ) {
          this.saveCompany( res.objects[0] );
        } else {
          this.companies = res.objects;
          this.pagination = res.pagination;
          this.preload = false;
          Helpers.removeSpinner();
        }
      })
    );
  }

  getUser() {
    this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
        this.createCompany(res);
      })
    );
  }

  createCompany(user) {
    const object = {
      advertiser: {
        name: user.type === 'Person' ? `${user.profile.first_name} ${user.profile.last_name}` : user.profile.company_name,
        about: '-',
        operating_hours: '-',
        phone: user.phone,
        user_id: user.id,
        profile: user.type.toLowerCase(),
      }
    }
    this.subscriptions.push(
      this.advertisersService.create(object).subscribe(res => {
        this.saveCompany(res);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
