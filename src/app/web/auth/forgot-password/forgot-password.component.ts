import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Cpf, noEmoji} from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Alert } from '@clicca-webapp/shared/class/alert';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { PushService } from '@clicca-webapp/shared/services/push-service/push-service.service';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user;

  public recoverForm: FormGroup;
  public codeForm: FormGroup;
  public passwordForm: FormGroup;
  public inputMask = InputMask;
  public pasPattern = "^((?=.*\\d)|(?=.*\\W+))(?=.*[a-z])(?=.*[A-Z]).{6,}$";

  pasUpp;
  pasNum;
  pasLow;
  pasChar;
  pasLim;
  pasEqu;
  show;
  pasSame;
  pasError;
  firstPass;
  secPass;
  public showBox = 1;
  public messageError = MessageError;

  public typeLogin: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private profileService: ProfileService,
    private pushService: PushService
  ) { }

  ngOnInit() {
    this.createFormRecover();
    this.createFormPassword();
    this.firstPass = this.passwordForm.get('user').get('password');
    this.secPass = this.passwordForm.get('user').get('confirmPassword');
  }

  goStep(id) {
    this.showBox = id;
  }

  showInput(event) {
    this.createFormRecover();
    if (this.isPJ()){
      this.recoverForm.get('user').get('login').setValidators([Validators.required, Validators.email]);
    } else{
      this.recoverForm.get('user').get('login').setValidators([Validators.required, Cpf]);
    }
  }


  isPJ(): boolean {
    return this.typeLogin;
  }

  showPassword(el) {
    const elH =  document.getElementById(el);
    this.show = !this.show;
    if (this.show) {
      elH.setAttribute('type', 'text');
    } else {
      elH.setAttribute('type', 'password');
    }
  }

  createFormRecover(): void {
    this.recoverForm = this.formBuilder.group({
      user: this.formBuilder.group({
        login: ['', [Validators.required, Cpf, noEmoji]]
      })
    });
  }

  createFormCode(): void {
    this.codeForm = this.formBuilder.group({
      user: this.formBuilder.group({
        login: [this.recoverForm.value.user.login , noEmoji],
        recover_code: ['', [Validators.required , noEmoji]]
      })
    });
  }

  createFormPassword(): void {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), noEmoji]],
        confirmPassword: ['', [ Validators.required, Validators.minLength(6), noEmoji]]

      })
    });
  }

  checkPasswordPattern(event){
      const pasVal = this.passwordForm.get('user').get('password').value;
      this.passwordForm.get('user').get('confirmPassword').setValue('');

      this.checkNumber(pasVal);
      this.checkUpperCase(pasVal);
      this.checkLowerCase(pasVal);
      this.checkChar(pasVal);
      this.checkLimit(pasVal);
      this.MatchPassword();
  }
 

  

  checkUpperCase(val){
    if(this.hasUpperCase(val)){
    //  console.log('Tem Uppercase');
      this.pasUpp = 'green';
      return null;
    } else if(val !== ''){
    //  console.log('Não Tem Uppercase');
      this.pasUpp = 'red';
      return this.firstPass.setErrors({'noUpperCase': true});
    } else {
      this.pasUpp = '';
      return this.firstPass.setErrors({'noUpperCase': true});
    }
}


checkLimit(val) {
  //console.log(val , val.length);
 // console.log(this.secPass.value , this.secPass);

      if( val.length < 6 || this.secPass.hasError('minlength') ) {
        this.pasLim = 'red';
      //  return this.firstPass.setErrors({'incorrect': true})
      } else {
        this.pasLim = 'green';
        // return null;
      } 
  }

checkChar(val){
  if(this.hasChar(val)){
    this.pasChar = 'green';
    return null;
  } else if(val !== ''){
    // console.log('Não Tem Char');
    this.pasChar = 'red';
    return this.firstPass.setErrors({'noChar': true});
  }  else {
    this.pasChar = '';
    return this.firstPass.setErrors({'noChar': true});
  }
}
  


checkNumber(val){
  if(this.hasNumber(val)){
    this.pasNum = 'green';
     return null;
  } else if(val !== ''){
    this.pasNum = 'red';
    return this.firstPass.setErrors({'incorrect': true});
  }  else {
    this.pasNum = '';
    return this.firstPass.setErrors({'incorrect': true});
  }
}

checkLowerCase(val){
  if(this.hasLowerCase(val)){
    this.pasLow = 'green';
    return null;
  } else if(val !== ''){
    this.pasLow = 'red';
    return this.firstPass.setErrors({'noLow': true})
  }  else {
    this.pasLow = '';
    return this.firstPass.setErrors({'noLow': true})
  }
}

MatchPassword(){
  let old = this.passwordForm.get('user').get('password').value;
  let conf = this.passwordForm.get('user').get('confirmPassword').value;
  // console.log('old:' old, 'pass:' pass,'conf:'conf);
  if( old === conf){
    this.pasEqu =  'green';
    return null;
  } else{
    this.pasEqu = 'red';
    return this.secPass.setErrors({'incorrect': true})
  }
}


  isFieldValid(attr, field: string) {
    return !this.passwordForm.get(attr).get(field).valid && this.passwordForm.get(attr).get(field).touched;
  }


  hasChar(str) {
    return (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str));
}


  hasNumber(str) {
    return (/[0-9]/.test(str));
}

  hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

  hasUpperCase(str) {
    return (/[A-Z]/.test(str));
  }



  submitForm(event): void {
    Helpers.applySpinner();
    if (!this.isPJ()){
      this.recoverForm.value.user.login = this.recoverForm.value.user.login.replace(/[^\d]+/g, '');
    }
    this.subscriptions.push(
      this.authenticateService.recoverPassword(this.recoverForm.value).subscribe(res => {
        this.goStep(2);
        this.createFormCode();
        Helpers.removeSpinner();
      })
    );
  }

  submitCodeForm(): void {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.validateRecover(this.codeForm.value).subscribe(res => {
        this.user = res;


        this.goStep(3);
        this.createFormPassword();

        this.firstPass = this.passwordForm.get('user').get('password');
        this.secPass = this.passwordForm.get('user').get('confirmPassword');
        Helpers.removeSpinner();
      })
    );
  }

  // submitPassForm() {
  //   if (ValidateForm.submitValidation(this.passwordForm) || this.pasSame || this.pasError) {console.log() }
  // }

  submitPasswordForm(): void {
    this.subscriptions.push(
      this.profileService.updatePassword(this.user.id, this.createObject()).subscribe(res => {
        sessionStorage.setItem('access_token', res.access_token);
        this.setTokenFirebase(res);
      })
    );
  }

  setTokenFirebase(res) {
    if (res.firebase_token === null && sessionStorage.getItem('firebase_token')) {
      this.sendToken(res);
    } else {
      sessionStorage.setItem('firebase_token', res.firebase_token);

      this.pushService.topics(res.firebase_token);
      this.redirect(res);
    }
  }

  sendToken(resObj) {
    const fbaseToken = sessionStorage.getItem('firebase_token');
    let dataObj;
    if (resObj.type === 'Person') {
      dataObj = {
        user:  {
          email: resObj.email,
          phone: resObj.phone,
          second_phone: resObj.second_phone,
          firebase_token: fbaseToken,
        },
        person: {
          first_name: resObj.profile.first_name,
          last_name: resObj.profile.last_name,
          cpf: resObj.profile.cpf,
          cnh: resObj.profile.cnh,
          birth_date: resObj.profile.birth_date ,
        },
        type: 'person',
      };
    } else {
      dataObj = {
        user: {
          email: resObj.email,
          phone: resObj.phone,
          second_phone: resObj.second_phone,
          firebase_token: fbaseToken,
        },
        company: {
          company_name:  resObj.profile.company_name,
          fantasy_name: resObj.profile.first_name,
          responsible: resObj.profile.responsible,
          role: resObj.profile.role,
          cnpj: resObj.profile.cnpj ,
          website: resObj.profile.website,
        },
        type: 'company',
      };
    }
    this.profileService.update(resObj.id, dataObj).subscribe(res => {
      this.redirect(res);
    });
  }

  redirect(params) {
    User.saveCache(params, false);
    Helpers.removeSpinner();
    Alert.success('Senha alterada');
    this.router.navigate(['/']);
  }

  createObject() {
    const objectUser = {
      user: {
        phone: this.user.phone,
        second_phone: this.user.second_phone,
        email: this.user.email,
        password: this.passwordForm.value.user.password
      },
    };
    let object;
    if (this.user.type === 'Company') {
      object = {
        type: 'company',
        company: {
          company_name: this.user.profile.company_name,
          responsible: this.user.profile.responsible,
          role: this.user.profile.role,
          cnpj: this.user.profile.cnpj
        }
      }
    } else {
      object = {
        type: 'person',
        person: {
          first_name: this.user.profile.first_name,
          last_name: this.user.profile.last_name,
          cpf: this.user.profile.cpf
        }
      }
    }
    return Object.assign(objectUser, object);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
