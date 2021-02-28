import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { HeaderService } from '@clicca-webapp/shared/services/header-service/header.service';
import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { Token } from '@angular/compiler';

declare var PagSeguroDirectPayment;

@Injectable()
export class PagseguroCardService {

  private subscriptions: Subscription[] = [];
  private sessionPagSeguro: boolean = false;

  constructor(
    private http: Http,
    private headerService: HeaderService
  ) { }

  // Carregando javascript do pagseguro
  loadJavascriptPagseguro() {
    return new Promise((resolve, reject) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve(true));
      script.src = environment.pagseguro_script;
      script.id = 'pagseguroDirectpayment';
      document.head.appendChild(script);
    });
  }

  setSessionPagSeguro() {
    this.loadJavascriptPagseguro().then(result => {
      this.subscriptions.push(
        this.startSession().subscribe(res => {
          PagSeguroDirectPayment.setSessionId(res.session_id);
          this.setPagSeguro();
        })
      );
    });
  }

  startSession(): Observable<any> {
    return this.http.get(`${environment.vehicle_url}/payment_sessions`, this.headerService.setHeader())
      .map(DataHandler.handlerData)
      .catch((e) => {
        return Observable.throw(
          new Error(`Ocorreu um erro no servidor`)
        );
      });
  }

  setPagSeguro() {
    this.sessionPagSeguro = true;
  }

  getPagSeguro() {
    return this.sessionPagSeguro;
  }

  createTokenPagSeguro(form) {
    return new Promise((resolve, reject) => {
      const card_number = form.pre_approval.payment_method.credit_card.holder.card_number;
      PagSeguroDirectPayment.getBrand({
        cardBin: card_number.substring(0, 6),
        success: (response) => {
          this.createCardToken(response.brand.name, form.pre_approval.payment_method.credit_card.holder)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
        },
        error: (response) => {
          reject('Ocorreu um erro na validação do cartão no PagSeguro');
        }
      });
    });
  }

  createTokenCCPagSeguro(form) {
    return new Promise((resolve, reject) => {
      const card_number = form.number;
     // console.log(card_number , card_number.substring(0, 6));
      PagSeguroDirectPayment.getBrand({
        cardBin: card_number.substring(0, 6),
        success: (response) => {
          this.createCardTokenCC(response.brand.name, form)
          .then(result => {
            form.token = result;
            resolve(result);
            //console.log('Token', result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
        },
        error: (response) => {
          reject('Ocorreu um erro na validação do cartão no PagSeguro 2');
          console.log(response);
        }
      });
    });
  }


  createCardTokenCC(brand, form) {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: form.number,
        brand: brand,
        cvv: form.cvv,
        expirationMonth: form.expiration_date.substring(0, 2),
        expirationYear: form.expiration_date.substring(3),
        success: (response) => {
          resolve(response.card.token);
        },
        error: (response) => {
          reject('Ocorreu um erro na validação do PagSeguro 3');
        }
      });
    });
  }

  createCardToken(brand, form) {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: form.card_number,
        brand: brand,
        cvv: form.cvv,
        expirationMonth: form.expiration_date.substring(0, 2),
        expirationYear: form.expiration_date.substring(3),
        success: (response) => {
          resolve(response.card.token);
        },
        error: (response) => {
          reject('Ocorreu um erro na validação do PagSeguro 3');
        }
      });
    });
  }

  getHash(form) {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.onSenderHashReady(response => {
        if (response.status === 'success') {
          form.hash = response.senderHash;
          //console.log('Hash Fim' , form.hash);
          // resolve (this.createTokenCCPagSeguro(form));
          resolve(response.senderHash);
        } else {
          reject(response.message);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
