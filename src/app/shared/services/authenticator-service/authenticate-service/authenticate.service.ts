import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from './../../header-service/header.service';
import { environment } from './../../../../../environments/environment';
import { DataHandler } from './../../../class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class AuthenticateService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  login(data): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/login`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  logout(id, token): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/logout/${id}/${token}`, {}, this.headerService.setHeader());
  }

  refreshToken(id, token): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/refresh/${id}/${token}`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  recoverPassword(data): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/recover_password`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  validateRecover(data): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/validate_recover`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  create(data): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/profiles`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  resendActivationToken(id, token): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/resend_activation_token/${id}/${token}`, {}, this.headerService.valRecoverHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }


}
