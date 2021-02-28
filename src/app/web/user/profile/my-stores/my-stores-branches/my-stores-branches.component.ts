import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { AdvertisersService } from '@clicca-webapp/shared/services/vehicle-selling/advertisers-service/advertisers.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-stores-branches',
  templateUrl: './my-stores-branches.component.html',
  styleUrls: ['./my-stores-branches.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyStoresBranchesComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public user = User.fromCache();
  public objects = [];
  public pagination;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private advService: AdvertisersService
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  listeningChangeRoutes(): void {
    this.checkAdvertiser(Helpers.encodeURIComponent(this.route.snapshot.queryParams));
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          const endpoint = res.url;
          const params = res.url.split('?').pop();
          this.checkAdvertiser(params);
        })
    );
  }

  checkAdvertiser(params) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.advService.list(this.user.id, params).subscribe(res => {
        this.objects = res.objects;
        // this.objects = res;
        this.pagination = res.pagination;
        Helpers.removeSpinner();
      })
    );
  }

  setStatus(event, advertiser) {
    if (advertiser.status === 'archive') {
      this.subscriptions.push(
        this.advService.setActive(advertiser.id).subscribe(resp => { })
      );
    } else {
      this.subscriptions.push(
        this.advService.setArchive(advertiser.id).subscribe(resp => { })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
