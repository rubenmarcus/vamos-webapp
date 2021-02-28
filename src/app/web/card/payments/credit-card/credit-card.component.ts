import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Routes, Router} from '@angular/router';
import { PagseguroCardService } from '@clicca-webapp/shared/services/plan-service/pagseguro-card.service';
import { ConnectionBackend } from '@angular/http';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { Subscription } from 'rxjs/Rx';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Cpf, validatePhone, ValidateDate, ValidateExpirationDate, noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';


@Component({ preserveWhitespaces: false,
  selector: 'card-payment-cc',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardPaymentCCComponent implements OnInit {
  @Input() PaymentDetails;
  @Input() RechargeDetails;
  @Output() goRecharge = new EventEmitter();

  public maskCEP = InputMask.cepMask;
  public inputMask = InputMask;
  public CCForm: FormGroup;
  public ccHash;
  public ccToken;
  public CCInfo;
  public FormType;
  private subscriptions: Subscription[] = [];
  private user = User.fromCache();
  public loaded = false;
  public phoneDDD;
  public phoneFinal;
  public ceperro;
  public messageError = MessageError;
  public states = Enum.states;

  constructor(
    private formBuilder: FormBuilder,
    private pagSeguro: PagseguroCardService,
    private cardService: CardService,
    private cepService: CepService,
    private profileService: ProfileService,
    public router: Router,
 ) { }

  ngOnInit() {
    this.loadInfo();
    this.startPS();
  }

  loadInfo() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
        this.loaded = true;
        this.phoneDDD = res.phone.slice(0, 2);
        this.phoneFinal = res.phone.slice(2, 11);
        Helpers.removeSpinner();
      })
    );
  }


  CheckZip(event) {
    if (event.target.value) {
      this.subscriptions.push(
        this.cepService.getaddress(this.CCForm.value.credit_card_data.billing_address.postal_code).subscribe(res => {
          if (res.erro === true) {
            this.ceperro = true; } else {
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

  CCBack() {
    
    this.goRecharge.emit();
  }

  startPS() {
    if (!this.pagSeguro.getPagSeguro()) {
      this.pagSeguro.setSessionPagSeguro();
    }
    this.CreateForm();
  }

    CreateForm() {
      if (this.RechargeDetails !== undefined) {
        this.RechargeForm();
        this.FormType = 'recharge';
        this.loaded = true;
      } else {
        this.FormType = 'payment';
        this.PaymentForm();
        this.loaded = true;
      }
    }

    RechargeForm() {
      this.CCForm = this.formBuilder.group({
        type: 'credit_card',
        recharge: this.formBuilder.group({
          account_id: this.RechargeDetails.payment.account_id,
          card_id: this.RechargeDetails.payment.card_id,
          order_attributes: this.formBuilder.group({
            amount: this.RechargeDetails.payment.amount
          })
        }),
        credit_card_data: this.formBuilder.group({
          number: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(19)]],
          expiration_date: ['', [Validators.required, ValidateExpirationDate]],
          cvv: ['', [Validators.required]],
          hash: '',
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
            area_code: this.phoneDDD,
            number: this.phoneFinal
          }),
          document: this.formBuilder.group({
            type: 'CPF',
            value: ['', [Validators.required, Cpf , noEmoji]],
          })
        })
      });
    }

    PaymentForm() {
      this.CCForm = this.formBuilder.group({
        type: 'credit_card',
        payment: this.formBuilder.group({
          account_id: this.PaymentDetails.payment.account_id,
          plan_id: this.PaymentDetails.payment.plan_id
        }),
        credit_card_data: this.formBuilder.group({
          number: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(19), noEmoji]],
          expiration_date: ['', [Validators.required, ValidateExpirationDate, noEmoji]],
          cvv: ['', [Validators.required, noEmoji]],
          hash: '',
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
            area_code: this.phoneDDD,
            number: this.phoneFinal,
          }),
          document: this.formBuilder.group({
            type: 'CPF',
            value: ['', [Validators.required, Cpf, noEmoji]],
          })
        })
      });
    }

    setToken(type) {
      this.pagSeguro.getHash(this.CCForm.value.credit_card_data).then(result => {
        this.CCForm.get('credit_card_data').get('hash').setValue(result);

        return this.pagSeguro.createTokenCCPagSeguro(this.CCForm.value.credit_card_data);
      }).then(result => {
        this.CCForm.get('credit_card_data').get('token').setValue(result);
        const CPFFinal = this.CCForm.value.credit_card_data.document.value.replace(/[^\d]+/g, '');
        this.CCForm.get('credit_card_data').get('document').get('value').setValue(CPFFinal);
        this.SendForm(type);
      });
    }


    SendForm(type) {
      if (type === 'payment') {
        Helpers.applySpinner();
        this.subscriptions.push(
          this.cardService.Pay(this.CCForm.value).subscribe(res => {
              Helpers.removeSpinner();
              Alert.success('Pagamento realizado com sucesso.');
              this.router.navigate(['/cartao/pagar/sucesso']);
            },
            error => {
              Alert.error(error.message);
              Helpers.removeSpinner();
            })
        );
      }
      if (type === 'recharge') {
        Helpers.applySpinner();
        this.subscriptions.push(
          this.cardService.recharge(this.CCForm.value).subscribe(res => {
              Helpers.removeSpinner();
              Alert.success('Pagamento realizado com sucesso.');
              this.router.navigate(['/cartao/pagar/sucesso']);
            },
            error => {
              Alert.error(error.message);
              Helpers.removeSpinner();
            })
        );
      }
    }

    isFieldValid(field: string, attr = null) {
      if (attr != null) {
        return !this.CCForm.get('credit_card_data').get(attr).get(field).valid && this.CCForm.get('credit_card_data').get(attr).get(field).touched;
      } else {
        return !this.CCForm.get('credit_card_data').get(field).valid && this.CCForm.get('credit_card_data').get(field).touched;
      }
    }

    submit() {
        const TypeSubmit = this.FormType;
        this.setToken(TypeSubmit);
    }


  submitForm() {
    if (ValidateForm.submitValidation(this.CCForm)) {this.submit(); }
  }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
          subscription.unsubscribe();
        });
      }

}
