import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormBuilder, ValidationErrors, NgForm, FormGroup, Validators} from '@angular/forms';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import {PasswordValidation , noEmoji} from '@clicca-webapp/shared/class/validator.method';
import { Subscription } from 'rxjs/Rx';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';
import { Router } from '@angular/router';


@Component({ preserveWhitespaces: false,
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordComponent implements OnInit {
  type = 'password';
  show = false;
  private subscriptions: Subscription[] = [];
  public passwordForm: FormGroup;
  public changePassForm: FormGroup;
  public  user = User.fromCache();
  pasInput;
  personData;
  loaded;
  pasUpp;
  pasNum;
  pasLow;
  pasChar;
  pasLim;
  pasEqu;
  pasSame;
  pasError;
  pasEquOld;
  firstPass;
  secPass;
  subscription;
  
  constructor(
    private router:Router,
    private profileService: ProfileService,
    private formBuilder: FormBuilder) { }



    

  showPassword(el) {
    const elH =  document.getElementById(el);
    this.show = !this.show;
    if (this.show) {
      elH.setAttribute('type', 'text');
    } else {
      elH.setAttribute('type', 'password');
    }
  }

  ngOnInit() {
    this.createForm();
    this.loaded = true;
    this.firstPass = this.passwordForm.get('password').get('password');

    this.secPass = this.passwordForm.get('password').get('confirmPassword');

  }



  checkPasswordPattern(event){
    const pasVal = event.target.value;
    this.passwordForm.get('password').get('confirmPassword').setValue('');
    this.checkNumber(pasVal);

    this.checkUpperCase(pasVal);
    this.checkLowerCase(pasVal);
    this.checkChar(pasVal);
    this.checkLimit(pasVal);
    this.checkifThree();
    this.MatchPassword();

  }



  checkChar(val){
    if(this.hasChar(val)){
      this.pasChar = 'green';
      return null;
    } else if(val !== ''){
      // console.log('Não Tem Numero');
      this.pasChar = 'red';
      return this.firstPass.setErrors({'Char': true})
    }  else {
      this.pasChar = '';
      return this.firstPass.setErrors({'Char': true})
    }
  }

  checkNumber(val){
    if(this.hasNumber(val)){
      this.pasNum= 'green';
       return null;
    } else if(val !== ''){
      // console.log('Não Tem Numero');
      this.pasNum = 'red';
      return this.firstPass.setErrors({'Number': true});
    }  else {
      this.pasNum = '';
      return this.firstPass.setErrors({'Number': true});
    }
  }



  checkLimit(val) {
        if( val.length < 6 || this.secPass.hasError('minlength') ) {
          this.pasLim = 'red';
        } else {
          this.pasLim = 'green';
        } 
    }

  checkLowerCase(val){
    if(this.hasLowerCase(val)){
      this.pasLow = 'green';
      return null;
    } else if(val !== ''){
      this.pasLow = 'red';
      return this.firstPass.setErrors({'Lower': true})
    }  else {
      this.pasLow = '';
      return this.firstPass.setErrors({'Lower': true})
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


  createForm() {
    this.passwordForm = this.formBuilder.group({
      user: this.formBuilder.group({
        old_password: ['', [ Validators.required, Validators.minLength(6), noEmoji ] ],
      }),
      password: this.formBuilder.group({
        password: ['', [ Validators.required, Validators.minLength(6), noEmoji]],
        confirmPassword: ['', [ Validators.required, Validators.minLength(6), noEmoji]]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      })
   });
  }

  checkField()
    { 
      this.passwordForm.get('password').get('confirmPassword').setValue('');
    }

  checkifThree(){
      let old = this.passwordForm.get('user').get('old_password').value;
      let pass =  this.passwordForm.get('password').get('password').value;
      let conf = this.passwordForm.get('password').get('confirmPassword').value;
      //console.log('old:' old, 'pass:' pass,'conf:'conf);
      if (old === conf || old === pass)  {
      // console.log('igual');
       this.pasEquOld = 'red';
       this.passwordForm.get('user').get('old_password').setValue('');
       return this.passwordForm.get('user').get('old_password').setErrors({'Three': true})
      
      } else {
      //  return null;
      // console.log('não igual');
        this.pasEquOld = 'green';
        return null;
      }
  }


  MatchPassword(){
    let old = this.passwordForm.get('password').get('password').value;
    let conf = this.passwordForm.get('password').get('confirmPassword').value;
    // console.log('old:' old, 'pass:' pass,'conf:'conf);
    if( old === conf){
      this.pasEqu =  'green';
      return null;
    } else{
      this.pasEqu = 'red';
      return this.secPass.setErrors({'Match': true})
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
      return this.firstPass.setErrors({'Upper': true});

    } else {
      this.pasUpp = '';
      return this.firstPass.setErrors({'Upper': true});
    }
  }



  buildForm(){
    const oldPass = this.passwordForm.get('user').get('old_password').value;
    const newPass = this.passwordForm.get('password').get('confirmPassword').value;
    this.changePassForm = this.formBuilder.group({
      user: this.formBuilder.group({
        old_password: oldPass,
        password: newPass
      })
    });
  }
  
  isFieldValid(attr, field: string) {
    return !this.passwordForm.get(attr).get(field).valid && this.passwordForm.get(attr).get(field).touched;
  }

  // submitPassword() {
  //   if (ValidateForm.submitValidation(this.passwordForm)) {this.submit(); }
  // }

  submit() {
    Helpers.applySpinner();
    this.buildForm();
    this.changePass();
  }



 changePass(){
    this.profileService.changePassword(this.changePassForm.value).subscribe(res => {
    Helpers.removeSpinner();
    Helpers.logOut();
    Alert.success('Senha Atualizada com sucesso.','redirect','/login' );
   
  });
 }

}
