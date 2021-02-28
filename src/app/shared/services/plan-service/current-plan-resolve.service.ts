import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Injectable()
export class CurrentPlanResolveService {

  constructor(
    private offerPlansService: OfferPlansService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BehaviorSubject<any>|Observable<any>|Promise<any>|any {
    const id = this.getParameter('user_id') || User.fromCache().id;
    return this.offerPlansService.currentPlan(id)
      .catch((error: any) => Observable.of(false));
  }

  getParameter(paramName) {
    var searchString = window.location.search.substring(1),
        i, val, params = searchString.split("&");

    for (i=0;i<params.length;i++) {
      val = params[i].split("=");
      if (val[0] == paramName) {
        return val[1];
      }
    }
    return null;
  }

}
