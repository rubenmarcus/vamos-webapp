import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

@Injectable()
export class CanalDaPecaService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService


  ) { }

  index(): Observable<any> {
    return this.http.get(`https://clicca.clubecdp.com.br/divulgacao/produtos/json/jsl-pecas`)
    .catch((error) => this.errorHandlerService.handleError(error) );
    //  .map(DataHandler.handlerData)
    // .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
