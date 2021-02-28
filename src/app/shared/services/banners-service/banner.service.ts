import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Rx';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';




@Injectable()
export class BannerService {
  constructor(
    private http: Http,
    private errorHandlerService: ErrorHandlerService,
    private headerService: HeaderService
  ) { }

  getBanner(format): Observable<any> {
    return this.http.get(`${environment.campaign_url}/banners/${format}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
     .catch((error) => this.errorHandlerService.handleError(error) );
  }

  home(): Observable<any> {
    return this.http.get(`${environment.campaign_url}/banners/home/header`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .timeout(10000)
     .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
