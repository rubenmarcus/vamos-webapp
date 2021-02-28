import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class ProfileService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }
  info(id): Observable<any> {

    return this.http.get(`${environment.authenticator_url}/profiles/${id}`, this.headerService.loginHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  Uinfo(id): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/profiles/${id}`, this.headerService.loginHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

 changePassword( data): Observable<any> {
    return this.http.put(`${environment.authenticator_url}/profiles/${User.fromCache().id}/change_password`, data,  this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  updatePassword(id, data): Observable<any> {
    return this.http.post(`${environment.authenticator_url}/authenticate/update_password/${id}`, data,  this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  send(data): Observable<any> {
    return this.http.put(`${environment.authenticator_url}/profiles/${User.fromCache().id}`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  update(id, data): Observable<any> {
    return this.http.put(`${environment.authenticator_url}/profiles/${id}`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  updatePicture(id, data): Observable<any> {
    return this.http.put(`${environment.authenticator_url}/profiles/${id}/update_picture`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
}
