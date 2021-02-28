import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private router: Router,
  ) { }

  handleError(error: Response | any) {
    Helpers.removeDisableButton();
    Helpers.removeSpinner();
    if ( error.name === 'TimeoutError' ) {
      Alert.error(`Tempo de request expirado`);
      return Observable.throw(error);
    } else {
      this.checkStatus(error);
    }
  }

  checkStatus(error) {
    switch (error.status) {
      case 401: {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
        Alert.error(`Não autorizado`);
        break;
      }
      case 404: {
        this.router.navigate(['/404']);
        break;
      }
      case 500: {
        this.router.navigate(['/500']);
        break;
      }
      default: {
        console.log(error);
        this.showMessage(JSON.parse(error['_body']));
        return Observable.throw(error);
      }
    }
  }

  showMessage(error) {
    const message = error.hasOwnProperty("error") ? error.error.full_message : error.message;
    Alert.error(message);
  }

}
