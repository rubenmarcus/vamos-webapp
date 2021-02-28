import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';
import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';

@Injectable()
export class ContentServiceService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  terms(): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/contents/terms`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  policies(): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/contents/policies`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  termsAndPolicies(): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/contents/terms_and_policies`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
