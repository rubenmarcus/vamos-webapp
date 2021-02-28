import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { validateCellphoneBR, Cpf, validatePhone , IsAdultAge, noEmoji} from '@clicca-webapp/shared/class/validator.method';
import { FormBuilder, FormGroup, Validators, FormControl ,ValidationErrors} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { GetCepService } from '@clicca-webapp/shared/services/profile-service/get-cep.service';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';

import { MessageError } from '@clicca-webapp/shared/class/message-error';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit, OnDestroy  {
  public maskCEP = InputMask.cepMask;
  public inputMask = InputMask;
  public maskPhone = InputMask.phoneMask;
  public personForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private user = User.fromCache();
  public userInfo = [];
  public loaded = false;
  public owner;
  public states = Enum.states;

  public messageError = MessageError;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private cepService: GetCepService
  ) { }

  ngOnInit() {
    this.getCard();
  }

  formatDate(input) {
    if (input) {
      const datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];
      return day + '/' + month + '/' + year;
    } else {
      return '';
    }
  }

  getCard() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.getOwner(this.user.id).subscribe(res => {
        this.owner = res[0].owner;
        const userInfo = res[0].owner.card_user;
        this.createFormUser(userInfo);

        this.loaded = true;
        Helpers.removeSpinner();
      }));
  }

  isFieldValid(field: string, attr = null ) {
    if (attr) {
      return !this.personForm.get('card_user').get(attr).get(field).valid && this.personForm.get('card_user').get(attr).get(field).touched;
    } else {
      return !this.personForm.get('card_user').get(field).valid && this.personForm.get('card_user').get(field).touched;
    }
  }

  createFormUser(res) {
    this.personForm = this.formBuilder.group({
      card_user: this.formBuilder.group({
        first_name: [res.first_name, [Validators.required, noEmoji]],
        last_name: [res.last_name, [Validators.required , noEmoji]],
        cpf: [{value: res.cpf, disabled: true}],
        gender: [res.gender || '', [Validators.required , noEmoji]],
        marital_status: [res.marital_status || '', [Validators.required, noEmoji]],
        phone: [res.phone || '', [validatePhone, noEmoji]],
        cellphone: [res.cellphone || '', [Validators.required, validateCellphoneBR, noEmoji]],
        email: [res.email || ''],
        rg: [res.rg || '', [Validators.required, Validators.maxLength(14), noEmoji]],
        birthdate: [this.formatDate(res.birthdate) || '', [IsAdultAge, noEmoji]],
        address_attributes: this.formBuilder.group({
          addressible_id: res.address.addressible_id,
          addressible_type: res.address.addressible_type,
          id: res.address.id,
          latitude: res.address.latitude,
          longitude: res.address.longitude,
          city: [res.address.city || '', [Validators.required, noEmoji]],
          complement: [res.address.complement || ''],
          district: [res.address.district || '', [Validators.required]],
          line1: [res.address.line1 || '', [Validators.required, noEmoji]],
          number: [res.address.number || '', [Validators.required, noEmoji]],
          state: [res.address.state || '', [Validators.required, noEmoji]],
          updated_at: res.address.updated_at,
          zip: [res.address.zip || '', [Validators.required, noEmoji]],
        }),
      })
    });
  }

  getLength(){
    Helpers.getLength(this.personForm.get('card_user').get('first_name').value , this.personForm.get('card_user').get('last_name').value);
  }


  submitForm() {
    if (ValidateForm.submitValidation(this.personForm)) {this.submit(); }
  }

  submit() {
    this.subscriptions.push(
      this.cardService.updateOwner(this.personForm.value, this.owner.account_id, this.owner.card_user.id).subscribe(res => {
        this.router.navigateByUrl('/cartao');
        Alert.success('Perfil Atualizado com sucesso.');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}