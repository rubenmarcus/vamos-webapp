import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';

@Injectable()
export class ScheduleService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService,
  ) { }




  // Plans

    getSpecialities(): Observable<any> {
      return this.http.get(`${environment.card_url}/specialities?per_page=200`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
    }

    schedule(data) {
      return this.http.post(`${environment.card_url}/schedules`, data ,  this.headerService.setHeader())
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
    }
}
