import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { Http } from '@angular/http';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class TemService {

  constructor(
     private http: Http,
     private errorHandlerService: ErrorHandlerService,
     private headerService: HeaderService) { }


  drugstore_all(): Observable<any> {
    return this.http.get(`${environment.tem_url}/drugstores-states`)
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
  }

  drugstore(obj): Observable<any> {
    if (obj.description !== undefined) {
      return this.http.get(`${environment.tem_url}/drugstores/search?latitude=${obj.latitude}&longitude=${obj.longitude}&radius=${obj.radius}&description=${obj.description}`)
      .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
      }  else {
      return this.http.get(`${environment.tem_url}/drugstores/search?latitude=${obj.latitude}&longitude=${obj.longitude}&radius=${obj.radius}`)
      .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
      }
    }

  TemNewtwork(): Observable<any> {
    return this.http.post(`${environment.tem_providers_url}/api/app/oauth/token`,
    'grant_type=client_credentials',
    this.headerService.TemNetwork());
  }
  getSpecialties(token): Observable<any> {
    return this.http.get(`${environment.tem_providers_url}/api/app/specialties`,
    this.headerService.TemToken(token))
    .map(DataHandler.handlerData);
  }

  getClinics(token, id, obj): Observable<any> {
    return this.http.get(`${environment.tem_providers_url}/api/app/specialties/${id}/providers?latitude=${obj.latitude}&longitude=${obj.longitude}&radius=${obj.radius}`,
    this.headerService.TemToken(token))
    .map(DataHandler.handlerData);
  }

}
