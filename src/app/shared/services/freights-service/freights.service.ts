import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class FreightsService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  index(): Observable<any> {
    return this.http.get(`${environment.freight_url}/freights`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  search(params?: any): Observable<any> {
    return this.http.get(`${environment.freight_url}/freights/search`, this.headerService.setHeader(params))
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  citiesunload(state): Observable<any> {
    return this.http.get(`${environment.freight_url}/support/unload_cities/${state}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  citiesload(state): Observable<any> {
    return this.http.get(`${environment.freight_url}/support/load_cities/${state}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  show(id): Observable<any> {
    return this.http.get(`${environment.freight_url}/freights/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  filter(): Observable<any> {
    return this.http.get(`${environment.freight_url}/support/all_resources`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  save(freight_id, data): Observable<any> {
    return this.http.post(`${environment.freight_url}/freights/${freight_id}/favorites`, data , this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  getFavorites(id, params): Observable<any> {
    return this.http.get(`${environment.freight_url}/favorites/${id}?${params}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  delete(freight_id, favorite_id): Observable<any> {
    return this.http.delete(`${environment.freight_url}/freights/${freight_id}/favorites/${favorite_id}`, this.headerService.setHeader());
  }

  viewers(freight_id, data): Observable<any> {
    return this.http.post(`${environment.freight_url}/freights/${freight_id}/viewers`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
  }

}
