import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { validateCellphoneBR, Cpf, validateEmail, validatePhone, noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-register-person',
  templateUrl: './person.component.html'
})

export class PersonComponent implements OnInit {

  @Input() hidePerson = false;

  private subscriptions: Subscription[] = [];

  public personForm: FormGroup;
  public cellMask = InputMask.cellMask;
  public maskPhone = InputMask.phoneMask;
  public cpfMask = InputMask.cpfMask;
  public numberPhone;
  public messageError = MessageError;
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
  formDisable;


  firstPass;
  secPass;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
  ) { }

  ngOnInit() {
    this.createFormUser();
    this.firstPass = this.personForm.get('user').get('password');
    this.secPass = this.personForm.get('user').get('confirmPassword');
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
    this.personForm = this.formBuilder.group({
      type: 'person',
      user: this.formBuilder.group({
        phone: ['', [Validators.required, validateCellphoneBR, noEmoji]],
        second_phone: ['', [validatePhone, noEmoji]],
        email: ['', [validateEmail, noEmoji]],
        password: ['', [Validators.required, Validators.minLength(6), noEmoji]],
        confirmPassword: ['', [Validators.required,Validators.minLength(6), noEmoji]]
      }),
      
      person: this.formBuilder.group({
        first_name: ['', [Validators.required, noEmoji, Validators.minLength(3)]],
        last_name: ['', [Validators.required, noEmoji]],
        cpf: ['', [Validators.required, Cpf, noEmoji]]
      })
    });
  }

  checkPasswordPattern(){
    const pasVal = this.personForm.get('user').get('password').value;
    this.personForm.get('user').get('confirmPassword').setValue('');

    this.checkNumber(pasVal);
    this.checkUpperCase(pasVal);
    this.checkLowerCase(pasVal);
    this.checkChar(pasVal);
    this.checkLimit(pasVal);
    this.MatchPassword();
 

   
    //this.checkFieldForm();
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



  MatchPassword(){
    let old = this.personForm.get('user').get('password').value;
    let conf = this.personForm.get('user').get('confirmPassword').value;
    // console.log('old:' old, 'pass:' pass,'conf:'conf);
    if( old === conf){
      this.pasEqu =  'green';
      return null;
    } else{
      this.pasEqu = 'red';
      return this.secPass.setErrors({'incorrect': true})
    }
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
      this.authenticateService.create(this.personForm.value).subscribe(res => {
        Alert.success('Usuário cadastrado com sucesso');
        this.router.navigate(['/login']);
        Helpers.removeSpinner();
      })
    );
  }


  // submitForm() {
  //   if (ValidateForm.submitValidation(this.personForm) && this.pasError) {this.submit();} else{
  //     // console.log(this.personForm.get('person').get('first_name').value, this.personForm.get('person').get('first_name').valid  )
  //   }
  // }


  isFieldValid(attr, field: string) {
    return !this.personForm.get(attr).get(field).valid && this.personForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
