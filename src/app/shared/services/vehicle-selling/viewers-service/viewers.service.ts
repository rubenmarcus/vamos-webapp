import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class ViewersService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  create(offer_id, data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers/${offer_id}/viewers`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      //.catch((error) => this.errorHandlerService.handleError(error) );
  }

}
