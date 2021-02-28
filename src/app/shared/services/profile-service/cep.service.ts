import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';


@Injectable()
export class CepService {

  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService,
  ) { }
  getaddress(cep): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
  }
}
