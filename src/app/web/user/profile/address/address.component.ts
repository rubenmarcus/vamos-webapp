import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { GetCepService } from '@clicca-webapp/shared/services/profile-service/get-cep.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'user-profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddressComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public addressForm: FormGroup;
  public user = User.fromCache();
  public maskCEP = InputMask.cepMask;
  public messageError = MessageError;
  public personData;
  public states = Enum.states;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: GetCepService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.loadUserInfo();
  }


  loadUserInfo() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
        this.personData = res;
        Helpers.removeSpinner();
        if (res.address == null) { this.createFormEmpty(res); }  else {  this.createFormData(res); }
      })
    );
  }

  createFormEmpty(profile) {
    if (this.user.profile_type === 'Person') {
      this.addressForm = this.formBuilder.group({
        id: this.user.id,
        user: this.formBuilder.group({
          address_attributes: this.formBuilder.group({
            line1: ['', [Validators.required, noEmoji] ],
            number: ['', [Validators.required, noEmoji] ],
            complement: ['', [noEmoji]],
            city: ['', [Validators.required, noEmoji] ],
            state: ['', [Validators.required, noEmoji] ],
            zip: ['', [Validators.required, noEmoji] ],
            district: ['', [Validators.required, noEmoji] ],
          }),
        }),
        type: 'person',
        person: this.formBuilder.group({
          first_name: this.personData.profile.first_name,
          last_name: this.personData.profile.last_name,
          cpf: this.personData.profile.cpf,
          cnh: this.personData.profile.cnh || '',
          birth_date: this.personData.profile.birth_date || '',
        })
      });
    } else {
      this.addressForm = this.formBuilder.group({
        id: this.user.id,
        user: this.formBuilder.group({
          address_attributes: this.formBuilder.group({
            line1: [ '', [Validators.required, noEmoji] ],
            number: [ '', [Validators.required, noEmoji] ],
            complement: [ '',  [noEmoji]],
            city: ['', [Validators.required, noEmoji] ],
            state: ['', [Validators.required, noEmoji] ],
            zip: ['', [Validators.required, Validators.minLength(9), noEmoji] ],
            district: ['', [Validators.required, noEmoji] ],
          }),
        }),
        type: 'company',
        company: this.formBuilder.group({
          company_name: this.personData.profile.company_name || '',
          fantasy_name: this.personData.profile.fantasy_name || '',
          responsible: this.personData.profile.responsible || '',
          role: this.personData.profile.role || '',
          cnpj: this.personData.profile.cnpj,
          website: this.personData.profile.cnpj || '',
        })
      });
    }
  }

  createFormData(profile) {
    if (this.user.profile_type === 'Person') {
      this.addressForm = this.formBuilder.group({
        id: this.user.id,
        user: this.formBuilder.group({
          address_attributes: this.formBuilder.group({
            line1: [this.personData.address.line1 || '', [Validators.required, noEmoji] ],
            number: [this.personData.address.number || '', [Validators.required, noEmoji] ],
            complement: [this.personData.address.complement || ''],
            city: [this.personData.address.city || '', [Validators.required, noEmoji] ],
            state: [this.personData.address.state || '', [Validators.required, noEmoji] ],
            zip: [this.personData.address.zip || '', [Validators.required, Validators.minLength(9), noEmoji] ],
            district: [this.personData.address.district || '', [Validators.required, noEmoji] ],
          }),
        }),
        type: 'person',
        person: this.formBuilder.group({
          first_name: this.personData.profile.first_name,
          last_name: this.personData.profile.last_name,
          cpf: this.personData.profile.cpf,
          cnh: this.personData.profile.cnh || '',
          birth_date: this.personData.profile.birth_date || '',
        })
      });
    } else {
      this.addressForm = this.formBuilder.group({
        id: this.user.id,
        user: this.formBuilder.group({
          address_attributes: this.formBuilder.group({
            line1: [this.personData.address.line1 || '', [Validators.required, noEmoji] ],
            number: [this.personData.address.number || '', [Validators.required, noEmoji] ],
            complement: [this.personData.address.complement || '', [noEmoji]],
            city: [this.personData.address.city || '', [Validators.required, noEmoji] ],
            state: [this.personData.address.state || '', [Validators.required, noEmoji] ],
            zip: [this.personData.address.zip || '', [Validators.required, noEmoji] ],
            district: [this.personData.address.district || '', [Validators.required, noEmoji] ],
          }),
        }),
        type: 'company',
        company: this.formBuilder.group({
          company_name: this.personData.profile.company_name || '',
          fantasy_name: this.personData.profile.fantasy_name || '',
          responsible: this.personData.profile.responsible || '',
          role: this.personData.profile.role || '',
          cnpj: this.personData.profile.cnpj,
          website: this.personData.profile.cnpj || '',
        })
      });
    }
  }

  isFieldValid(field: string) {
    return !this.addressForm.get('user').get('address_attributes').get(field).valid && this.addressForm.get('user').get('address_attributes').get(field).touched;
  }
  
  submitForm() {
    if (ValidateForm.submitValidation(this.addressForm)) {this.submit(); }
  }

  submit() {
    Helpers.applySpinner();
    this.profileService.send(this.addressForm.value).subscribe(res => {
      Helpers.removeSpinner();
      Alert.success('Perfil Atualizado com sucesso.');
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
