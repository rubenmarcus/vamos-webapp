import { environment } from 'environments/environment';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class MessageService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService
  ) { }
  message(): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/pushes/by_platform/Web`, this.headerService.setHeader())
    .map(DataHandler.handlerData)
    .timeout(10000)
    .catch((error) => this.errorHandlerService.handleError(error) );
  }
}
