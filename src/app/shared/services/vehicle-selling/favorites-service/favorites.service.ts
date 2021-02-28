import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class FavoritesService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  create(offer_id, data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers/${offer_id}/favorites`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  delete(offer_id, id): Observable<any> {
    return this.http.delete(`${environment.vehicle_url}/offers/${offer_id}/favorites/${id}`, this.headerService.setHeader())
      // .map(DataHandler.handlerData)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  list(user_id, params): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/favorites/${user_id}?${params}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
