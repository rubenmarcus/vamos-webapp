import { Component, OnInit } from '@angular/core';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { Subscription } from 'rxjs/Rx';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { PagseguroCardService } from '@clicca-webapp/shared/services/plan-service/pagseguro-card.service';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Cpf, validatePhone, ValidateDate, ValidateExpirationDate } from '@clicca-webapp/shared/class/validator.method';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { Alert } from '@clicca-webapp/shared/class/alert';


@Component({ preserveWhitespaces: false,
  selector: 'app-webview-tem-payment',
  templateUrl: './webview-tem-payment.component.html',
  styleUrls: ['./webview-tem-payment.component.scss']
})
export class WebviewTemPaymentComponent implements OnInit {
    public inputMask = InputMask;
    step1 = true;
    step2 = false;
    private subscriptions: Subscription[] = [];
    public CCForm: FormGroup;
    public planId;
    public accountId;
    loaded = false;
    showDialog;
    public ceperro;
    phonerro;
    public messageError = MessageError;
    public states = Enum.states;

    constructor(private route: ActivatedRoute,
      private cardService: CardService,
      private pagSeguro: PagseguroCardService,
      private cepService: CepService,
      private formBuilder: FormBuilder,
      public router: Router) { }

      ngOnInit() {

        this.accountId = this.route.snapshot.queryParams['user_id'];
       // this.planId = this.route.snapshot.queryParams['plan_id'];

        if (this.accountId === undefined ) {
          this.showMessageError('Ocorreu um erro tente novamente.');
        } else {
          this.pagSeguro.setSessionPagSeguro();
          this.PaymentForm();
          this.loaded = true;
        }
      }

    goStep2() {
      this.step1 = false;
      this.step2 = true;
    }

    PaymentForm() {
      this.CCForm = this.formBuilder.group({
        type: 'credit_card',
        payment: this.formBuilder.group({
          account_id: this.accountId,
          plan_id: this.planId
        }),
        credit_card_data: this.formBuilder.group({
          number: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(19), noEmoji]],
          expiration_date: ['', [Validators.required, ValidateExpirationDate, noEmoji]],
          cvv: ['', [Validators.required, noEmoji]],
          hash: '', // Obtained by PagSeguro javascript
          token: '',
          billing_address: this.formBuilder.group({
            street: ['', [Validators.required, noEmoji]],
            number: ['', [Validators.required, noEmoji]],
            complement: '',
            city: ['', [Validators.required, noEmoji]],
            state: ['', [Validators.required, noEmoji]],
            district: ['', [Validators.required, noEmoji]],
            postal_code: ['', [Validators.required, noEmoji]],
          }),
          holder: this.formBuilder.group({
            name: ['', [Validators.required, noEmoji]],
            birth_date: ['', [Validators.required, ValidateDate, noEmoji]],
          }),
          phone: this.formBuilder.group({
            area_code: '',
            number: ''
          }),
          document: this.formBuilder.group({
            type: 'CPF',
            value: ['', [Validators.required, Cpf, noEmoji]],
          })
        })
      });
    }

    setToken() {
      this.pagSeguro.getHash(this.CCForm.value.credit_card_data).then(result => {
        this.CCForm.get('credit_card_data').get('hash').setValue(result);
        return this.pagSeguro.createTokenCCPagSeguro(this.CCForm.value.credit_card_data);

      }).then(result => {
        this.CCForm.get('credit_card_data').get('token').setValue(result);
        const CPFFinal = this.CCForm.value.credit_card_data.document.value.replace(/[^\d]+/g, '');

        this.CCForm.get('credit_card_data').get('document').get('value').setValue(CPFFinal);
        this.SendForm();
      });
    }

    isFieldValid(field: string, attr = null) {
      if (attr != null) {
        return !this.CCForm.get('credit_card_data').get(attr).get(field).valid && this.CCForm.get('credit_card_data').get(attr).get(field).touched;
      } else {
        return !this.CCForm.get('credit_card_data').get(field).valid && this.CCForm.get('credit_card_data').get(field).touched;
      }
    }

    CheckPhone(event) {
      if (event.target.value) {
        const phone = ( < HTMLInputElement > document.getElementById('telefone')).value;
        const phoneDDD = phone.slice(1, 3);
        const phoneFinal = phone.slice(3, 15).replace(/[^\d]+/g, '');

        this.CCForm.get('credit_card_data').get('phone').get('area_code').setValue(phoneDDD);
        this.CCForm.get('credit_card_data').get('phone').get('number').setValue(phoneFinal);
        this.phonerro = false;

      } else {
        this.phonerro = true;
      }
    }


    CheckZip(event) {
      if (event.target.value) {
        this.subscriptions.push(
          this.cepService.getaddress(this.CCForm.value.credit_card_data.billing_address.postal_code).subscribe(res => {
            if (res.erro === true) {
              this.ceperro = true;
            } else {
              this.CCForm.get('credit_card_data').get('billing_address').get('street').setValue(res.logradouro);
              this.CCForm.get('credit_card_data').get('billing_address').get('city').setValue(res.localidade);
              this.CCForm.get('credit_card_data').get('billing_address').get('state').setValue(res.uf);
              this.CCForm.get('credit_card_data').get('billing_address').get('district').setValue(res.bairro);
              this.ceperro = false;
            }
          })
        );
      }
    }

    showMessageError(error) {
      this.showDialog = error;
      this.router.navigate([`/webview/tem-payment`], {
        queryParams: {
          showDialog: error
        },
        queryParamsHandling: 'merge'
      });
    }

     SendForm() {
        Helpers.applySpinner();
        (
           this.cardService.PayWv(this.CCForm.value, this.route.snapshot.queryParams.access_token).subscribe(res => {
            Helpers.removeSpinner();
             Alert.success('Pagamento realizado com sucesso.');
             this.router.navigate(['/webview/tem-payment-success']);
          }, error => {
            Helpers.removeSpinner();
             this.showMessageError(error.error.message);
                })
          );
        }


        ngOnDestroy() {
          this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
          });
        }
 }


