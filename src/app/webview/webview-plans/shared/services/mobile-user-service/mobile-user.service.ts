import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { environment } from 'environments/environment';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';

@Injectable()
export class MobileUserService {

  constructor(
    private http: Http,
    private headerService: HeaderService
  ) { }

  show(id, token): Observable<any> {
    const header = this.headerService.setHeader();
    header.headers.append('Access-Token', token );
    return this.http.get(`${environment.authenticator_url}/profiles/${id}`, header)
      .map(DataHandler.handlerData)
      .catch((error) => {
        Helpers.removeSpinner();
        return Observable.throw(JSON.parse(error['_body']));
      });
      // .catch(DataHandler.handlerError);
  }

}
