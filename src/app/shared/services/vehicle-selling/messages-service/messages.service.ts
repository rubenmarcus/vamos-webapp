import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class MessagesService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  create(offer_id, data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers/${offer_id}/messages`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  by_user(user_id): Observable<any>{
    return this.http.get(`${environment.vehicle_url}/conversations/by_user/${user_id}`, this.headerService.setHeader())
    .map(DataHandler.handlerData)
    .timeout(10000)
    .catch((error) => this.errorHandlerService.handleError(error) );
  }

list_dialog(conversation, params?: any): Observable<any> {
  return this.http.get(`${environment.vehicle_url}/conversations/${conversation}`, this.headerService.setHeader(params))
    .map(DataHandler.handlerData)
    .timeout(10000)
    .catch((error) => this.errorHandlerService.handleError(error) );
}

}
