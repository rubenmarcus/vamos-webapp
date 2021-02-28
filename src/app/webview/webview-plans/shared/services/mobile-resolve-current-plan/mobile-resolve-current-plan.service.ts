import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MobileResolveCurrentPlanService {

  constructor(
    private router: Router,
    private mobilePlanService: MobilePlanService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BehaviorSubject<any>|Observable<any>|Promise<any>|any {
    const id = this.getParameter('user_id');
    return this.mobilePlanService.currentPlan(id)
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
