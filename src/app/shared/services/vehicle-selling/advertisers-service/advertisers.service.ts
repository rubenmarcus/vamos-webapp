import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class AdvertisersService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

 getUser(user_id): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/advertisers/by_user/${user_id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  byUser(user_id, params): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/advertisers/by_user/${user_id}?${params}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  list(user_id,params): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/advertisers/by_user/${user_id}?${params}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  create(data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/advertisers`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  update(data): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/advertisers`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  updateUser(data, id): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/advertisers/${id}`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  show(id): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/advertisers/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  changeStatus(id, status): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/advertisers/${id}/${status}`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  setActive(id): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/advertisers/${id}/active`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  setArchive(id): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/advertisers/${id}/archive`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
}
