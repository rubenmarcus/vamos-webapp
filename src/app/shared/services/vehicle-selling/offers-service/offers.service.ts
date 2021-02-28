import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class OffersService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  index(): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offers`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  search(name, params = null): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offers/search/${name}?${params}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offers/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  byUser(id, per_page = 20): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/offers/by_user/${id}?per_page=${per_page}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  changeStatus(id, status): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/offers/${id}/change_status/${status}`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  create(data): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  update(id, data): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/offers/${id}`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  updateVehicle(offer_id, id, data): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/offers/${offer_id}/vehicle`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  updateImplements(offer_id, id, data): Observable<any> {
    return this.http.put(`${environment.vehicle_url}/offers/${offer_id}/implement`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  addOptional(id, optionalId): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers/${id}/add_optional/${optionalId}`, {}, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      // .timeout(10000)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  delOptional(id, optionalId): Observable<any> {
    return this.http.delete(`${environment.vehicle_url}/offers/${id}/del_optional/${optionalId}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      // .timeout(10000)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  addPhoto(offer_id, formData): Observable<any> {
    return this.http.post(`${environment.vehicle_url}/offers/${offer_id}/images`, formData, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      // .timeout(10000)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  delPhoto(offer_id, id): Observable<any> {
    return this.http.delete(`${environment.vehicle_url}/offers/${offer_id}/images/${id}`, this.headerService.setHeader())
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }
}
