import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { validateCellphoneBR, validatePhone, Cnpj, noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-register-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  @Input() hideCompany = false;

  private subscriptions: Subscription[] = [];
  public email;
  public companyForm: FormGroup;
  public maskPhone = InputMask.phoneMask;
  public cnpjMask = InputMask.cnpjMask;
  public cellMask = InputMask.cellMask;
  public pasPattern = "^((?=.*\\d)|(?=.*\\W+))(?=.*[a-z])(?=.*[A-Z]).{6,}$";

  public messageError = MessageError;

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
  ) { }

  ngOnInit() {
    this.createFormUser();
    this.firstPass = this.companyForm.get('user').get('password');
    this.secPass = this.companyForm.get('user').get('confirmPassword');
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(event.target.value)){
      this.maskPhone = InputMask.cellMask;
    }else{
      this.maskPhone = InputMask.phoneMask;
    }
  }

  createFormUser(): void {
    this.companyForm = this.formBuilder.group({
      type: 'company',
      user: this.formBuilder.group({
        phone: ['', [Validators.required, validatePhone, noEmoji]],
        second_phone: ['', [validatePhone]],
        email: ['', [Validators.required, Validators.email, noEmoji]],
        password: ['', [Validators.required, Validators.minLength(6), noEmoji]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), noEmoji]]
      }),
      company: this.formBuilder.group({
        company_name: ['', [Validators.required, noEmoji, Validators.minLength(3)]],
        // last_name: ['', [Validators.required]],
        responsible: ['', [Validators.required, noEmoji]],
        role: ['', [Validators.required, noEmoji]],
        cnpj: ['', [Validators.required, Cnpj, noEmoji]]
      })
    });
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


checkPasswordPattern(){
  const pasVal = this.companyForm.get('user').get('password').value;

  this.checkNumber(pasVal);
  this.checkUpperCase(pasVal);
  this.checkLowerCase(pasVal);
  this.checkChar(pasVal);
  this.checkLimit(pasVal);
  this.checkifThree();


 
  //this.checkFieldForm();
}

  checkifThree(){
    let old = this.companyForm.get('user').get('password').value;
    let conf = this.companyForm.get('user').get('confirmPassword').value;
    // console.log('old:' old, 'pass:' pass,'conf:'conf);
    if( old === conf){
      this.pasEqu =  'green';
      return null;
    } else{
      this.pasEqu = 'red';
      return this.secPass.setErrors({'incorrect': true})
    }
  }


  checkLimit(val) {
    //console.log(val , val.length);
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
        // console.log('Não Tem Numero');
        this.pasChar = 'red';
        return this.firstPass.setErrors({'incorrect': true})
      }  else {
        this.pasChar = '';
        return this.firstPass.setErrors({'incorrect': true})
      }
  }

checkNumber(val){
  if(this.hasNumber(val)){
    this.pasNum = 'green';
     return null;
  } else if(val !== ''){
    // console.log('Não Tem Numero');
    this.pasNum = 'red';
    return this.firstPass.setErrors({'incorrect': true});
  }  else {
    this.pasNum = '';
    return this.firstPass.setErrors({'incorrect': true});
  }
}

checkLowerCase(val){
  if(this.hasLowerCase(val)){
    // console.log('Tem Lowercase');
    this.pasLow = 'green';
    return null;
  } else if(val !== ''){
   // console.log('Não Tem Lowercase');
    this.pasLow = 'red';
    return this.firstPass.setErrors({'incorrect': true})
  }  else {
    this.pasLow = '';
    return this.firstPass.setErrors({'incorrect': true})
  }
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



  checkUpperCase(val){
      if(this.hasUpperCase(val)){
      //  console.log('Tem Uppercase');
        this.pasUpp = 'green';
        return null;
      } else if(val !== ''){
      //  console.log('Não Tem Uppercase');
        this.pasUpp = 'red';
        return this.firstPass.setErrors({'incorrect': true});
      } else {
        this.pasUpp = '';
        return this.firstPass.setErrors({'incorrect': true});
      }
  }







  submit(): void {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.create(this.companyForm.value).subscribe(res => {
        Alert.success('Usuário cadastrado com sucesso');
        this.router.navigate(['/login']);
        Helpers.removeSpinner();
      })
    );
  }

  // submitForm() {
  //   if (ValidateForm.submitValidation(this.companyForm) && this.pasError) {this.submit();}
  // }

  isFieldValid(attr, field: string) {
    return !this.companyForm.get(attr).get(field).valid && this.companyForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
