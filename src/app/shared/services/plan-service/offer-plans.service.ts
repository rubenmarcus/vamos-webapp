import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class OfferPlansService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  index(id): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/profiles/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
  }

  byKind(params?: any) : Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offer_plans/by_kind/default?status=active`, this.headerService.setHeader(params))
      .map(DataHandler.handlerData)
  }

  show(id) : Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offer_plans/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
  }

  currentPlan(user_id): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/subscriptions/current/${user_id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
  }

  subscriptions(offer_plan_id, data) : Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offer_plans/${offer_plan_id}/subscriptions`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => {
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  cencelled(offer_plan_id) : Observable<any> {
    return this.http.post(`${environment.vehicle_url}/subscriptions/${offer_plan_id}/cancel`, {}, this.headerService.setHeader())
      .catch((error) => {
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  startSession(): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/payment_sessions`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => {
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  enableFreeSubscription(userId): Observable<any> {
    return this.http.put(`${environment.authenticator_url}/profiles/${userId}/enable_free_subscription`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => {
        return Observable.throw(JSON.parse(error['_body']));
      });
  }

  planRequests(data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/plan_requests`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
