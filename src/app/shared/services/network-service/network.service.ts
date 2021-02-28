import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class NetworkService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  search(params?: any): Observable<any> {
    return this.http.get(`${environment.freight_url}/networks/search`, this.headerService.setHeader(params))
      .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
