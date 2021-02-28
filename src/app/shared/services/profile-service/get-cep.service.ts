import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class GetCepService {
  public subscriptions: Subscription[] = [];

  constructor(
    public  cepService: CepService,
  ) {}

 loadCep(event, form) {
   // console.log(form);
   return new Promise((resolve, reject) => {
    if (event.target.value.length === 9) {
      this.subscriptions.push(
        this.cepService.getaddress(form.get('zip').value).subscribe(res => {
          if (res.erro === true) {
            form.get('zip').setErrors({'incorrect': true});
            resolve(false);
          } else {
            form.get('line1').setValue(res.logradouro);
            form.get('city').setValue(res.localidade);
            form.get('state').setValue(res.uf);
            form.get('district').setValue(res.bairro);
            form.get('zip').setErrors(null);
            resolve(true);
          }
        })
      );
    } else {
      form.get('zip').setErrors({'required': true});
    }
  });
}
}
