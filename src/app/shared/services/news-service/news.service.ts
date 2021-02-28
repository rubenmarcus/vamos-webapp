import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';

@Injectable()
export class NewsService {

  constructor(
    private http: Http,
  ) { }

  index(): Observable<any> {
    // return this.http.get(`/assets/brasilcaminhoneiro.xml`)
    //   // .map(DataHandler.handlerData)
    //   // .catch((error) => this.errorHandlerService.handleError(error) );
    return this.http.get(`${environment.new_url}/feed/`)
      // .map(DataHandler.handlerData)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

  show(id): Observable<any> {
    // http://brasilcaminhoneiro.com.br/entenda-a-nova-legislacao-para-o-tamanho-de-cegonheiros/feed/?withoutcomments=1
    return this.http.get(`${environment.new_url}/${id}/feed/?withoutcomments=1`)
      // .map(DataHandler.handlerData)
      // .catch((error) => this.errorHandlerService.handleError(error) );
  }

}
