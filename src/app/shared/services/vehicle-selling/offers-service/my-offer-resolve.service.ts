import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';

@Injectable()
export class MyOfferResolveService {

  constructor(
    private offersService: OffersService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BehaviorSubject<any>|Observable<any>|Promise<any>|any {
    return this.offersService.search('offers', `user_id=${User.fromCache().id}&status=published`)
      .catch((error: any) => Observable.of(false));
  }

}
