import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Helpers } from './helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';

export class DataHandler {

  static handlerData(res: Response | any) {
    const body = res.json();
    return body;
  }

  static handlerError(error: Response | any) {
    let errorMessage: string, status: number, errorJson, message;
    // Helpers.removeDisableButton();
    Helpers.removeSpinner();
    // console.log(error)
    if (error.status === 401) {
      errorMessage = `Não autorizado`;
      localStorage.clear();
      // voltar para home
    } else {
      errorJson = JSON.parse(error['_body']);
      errorMessage = error.toString();
    }
    Alert.error(errorJson.error.full_message);
    return Observable.throw(errorMessage);
  }
}
