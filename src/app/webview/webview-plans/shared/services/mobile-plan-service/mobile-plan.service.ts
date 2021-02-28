import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';

@Injectable()
export class MobilePlanService {

  constructor(
    private http: Http,
    private headerService: HeaderService
  ) { }

  byKind(params?: any) : Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offer_plans/by_kind/default?status=active`, this.headerService.setHeader(params))
      .map(DataHandler.handlerData)
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  currentPlan(user_id): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/subscriptions/current/${user_id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
  }

  subscriptions(offer_plan_id, data) : Observable<any> {

    
    return this.http.post(`${environment.vehicle_url}/offer_plans/${offer_plan_id}/subscriptions`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  cencelled(offer_plan_id) : Observable<any> {
    return this.http.post(`${environment.vehicle_url}/subscriptions/${offer_plan_id}/cancel`, {}, this.headerService.setHeader())
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  enableFreeSubscription(userId, token): Observable<any> {
    const header = this.headerService.setHeader();
    header.headers.append('Access-Token', token );
    
    return this.http.put(`${environment.authenticator_url}/profiles/${userId}/enable_free_subscription`, {}, header)
      .map(DataHandler.handlerData)
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  planRequests(data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/plan_requests`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

}
