import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { environment } from 'environments/environment';

@Injectable()
export class CardService {

  constructor(
    private http: Http,
    private headerService: HeaderService,
    private errorHandlerService: ErrorHandlerService,
  ) { }


  getOwner(id): Observable<any> {
    return this.http.get(`${environment.card_url}/accounts/by_user/${id}`, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }
  updateOwner(data, account_id, id): Observable<any> {
    return this.http.put(`${environment.card_url}/accounts/${account_id}/users/${id}`, data, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  getCard(cpf): Observable<any> {
    return this.http.get(`${environment.card_url}/cards/by_cpf/${cpf}`, this.headerService.setHeader())
    .map(DataHandler.handlerData)
   .catch((error) => this.errorHandlerService.handleError(error) );
  }

  createDependent(id, data): Observable<any> {
    return this.http.post(`${environment.card_url}/accounts/${id}/users`, data, this.headerService.setHeader())
    .map(DataHandler.handlerData)
   .catch((error) => this.errorHandlerService.handleError(error) );
  }

  getDependent(id): Observable<any> {
    return this.http.get(`${environment.card_url}/accounts/${id}/users`, this.headerService.setHeader())
    .map(DataHandler.handlerData)
   .catch((error) => this.errorHandlerService.handleError(error) );
  }
  getTerms(): Observable<any> {
    return this.http.get(`${environment.authenticator_url}/contents/card_terms`, this.headerService.setHeader())
    .map(DataHandler.handlerData)
   .catch((error) => this.errorHandlerService.handleError(error) );
  }
  removeDependent(id, status): Observable<any> {
    return this.http.put(`${environment.card_url}/cards/${id}/change_status/${status}`, {}, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  // Payments

  getPayments(id): Observable<any> {
    return this.http.get(`${environment.card_url}/payments/by_account/${id}`, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }

  Pay(data): Observable<any> {
    return this.http.post(`${environment.card_url}/payments`, data, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }



  // Recharge
  recharge(data ): Observable<any> {
    return this.http.post(`${environment.card_url}/recharges`, data, this.headerService.setHeader())
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }


  PayWv(data, token): Observable<any> {
    const header = this.headerService.setHeader();
    header.headers.append('Access-Token', token );
    return this.http.post(`${environment.card_url}/payments`, data, header)
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }



  // Recharge
  rechargeWv(data , token): Observable<any> {
    const header = this.headerService.setHeader();
    header.headers.append('Access-Token', token );
    return this.http.post(`${environment.card_url}/recharges`, data, header)
       .map(DataHandler.handlerData)
      .catch((error) => this.errorHandlerService.handleError(error) );
  }




  // Plans

    getPlan(id): Observable<any> {
      return this.http.post(`${environment.card_url}/plans/${id}`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
    }

    getAllPlans() {
      return this.http.get(`${environment.card_url}/plans`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
    }


    preRegister(data): Observable<any> {
      return this.http.post(`${environment.card_url}/accounts`, data, this.headerService.setHeader())
      .map(DataHandler.handlerData)
     .catch((error) => this.errorHandlerService.handleError(error) );
    }

    getPromotion(): Observable<any> {
      return this.http.get(`${environment.card_url}/promotional_cards/current`, this.headerService.setHeader())
         .map(DataHandler.handlerData)
        .catch((error) => this.errorHandlerService.handleError(error) );
    }
  

}
