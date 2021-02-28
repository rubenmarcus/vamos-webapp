import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class ModelsService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  index(id, params?: any): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/brands/${id}/models`, this.headerService.setHeader(params))
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
