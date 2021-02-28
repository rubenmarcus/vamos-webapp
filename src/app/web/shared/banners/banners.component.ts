import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BannerService } from '@clicca-webapp/shared/services/banners-service/banner.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannersComponent implements OnInit {

  @Input() type;

  private subscriptions: Subscription[] = [];
  public banner;

  constructor(
    private bannerService: BannerService,
  ) { }

  ngOnInit() {
    this.apiCall();
  }

  apiCall() {
    // const bannerType = this.type === 'home_header' ? 'home/header' : this.type;
    const bannerType = this.type;
    this.subscriptions.push(
      this.bannerService.getBanner(bannerType).subscribe(res => {
        if (res['banner']) {
          this.banner = res.banner;
        }
      })
    );
  }

  url() {
    return `http://${this.banner.destination_url.replace(/(^\w+:|^)\/\//, '')}`;
  }

  setClass() {
    switch(this.banner.format) {
      case 'header' : {
        return 'banner-header';
      }
      case 'home_header' : {
        return 'banner-home-header';
      }
      case 'home' : {
        return 'banner-home';
      }
      case 'footer_rectangle' : {
        return 'banner-footer';
      }
      case 'footer_rectangle_two' : {
        return 'banner-footer';
      }
      case 'footer_rectangle_three' : {
        return 'banner-footer';
      }
      case 'services_header' : {
        return 'banner-services';
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
