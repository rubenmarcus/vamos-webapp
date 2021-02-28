import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { NetworkService } from '@clicca-webapp/shared/services/network-service/network.service';
import { Subscription } from 'rxjs';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Router } from '@angular/router';
@Component({ preserveWhitespaces: false,
  selector: 'services-block-network',
  templateUrl: './block-network.component.html',
  styleUrls: ['./block-network.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockNetworkComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public establ = [];
  constructor ( private networkService: NetworkService, private router: Router) { }

  ngOnInit() {
    // this.getSearch();
    this.checkGeolocation();
  }

  checkGeolocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.getSearch( { location: `${position.coords.latitude},${position.coords.longitude}` } );
        },
        error => {
          this.getSearch();
        }
      );
    };
  }

  getSearch(params?: any) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.networkService.search(params).subscribe(res => {
        this.establ = res.objects;
        Helpers.removeSpinner();
      })
    );
  }

  redirect(element) {
    let queryParams;
    if (element.hasOwnProperty('address')) {
      // queryParams = { latitude: element.address.latitude, longitude: element.address.longitude };
      queryParams = { network_id: element.id };
    }
    this.router.navigate(['/network'], { queryParams: queryParams });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
