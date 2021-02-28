import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import {Router} from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';

import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { PushService } from '@clicca-webapp/shared/services/push-service/push-service.service';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public signIn: FormGroup;
  public submited = false;
  public show = false;
  public type = 'password';
  public userawaiting = false;
  public userInfo;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticateService,
    private profileService: ProfileService,
    private pushService: PushService
   ) { }

  ngOnInit() {
    this.createSignInForm();
  }

  createSignInForm() {
    this.signIn = this.formBuilder.group({
      logged_in: false,
      user: this.formBuilder.group({
        login: ['', [ Validators.required , noEmoji] ],
        password: ['', [ Validators.required, Validators.minLength(6), noEmoji] ]
      })
    });
  }

  loginPage() {
    this.userawaiting = false;
  }

  submitForm(): void {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.login(this.signIn.value).subscribe(res => {
        sessionStorage.setItem('access_token', res.access_token);
        if ( res.status === 'awaiting') {
          this.userawaiting = true;
          this.userInfo = res;
         // this.router.navigate([`/account/${res.id}`]);
          Helpers.removeSpinner();
          //  console.log(res, res.profile);
          localStorage.setItem('logged_in', this.signIn.controls.logged_in.value || '');
          sessionStorage.setItem('access_token', res.access_token);
          sessionStorage.setItem('usertoken',  res.access_token);
        } else {
          // console.log('UserToken', res.access_token);
          Helpers.removeSpinner();
       this.setTokenFirebase(res);
        }
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
   // console.log('Login Params' , params, this.signIn.controls.logged_in.value);
    User.saveCache(params, this.signIn.controls.logged_in.value);
    this.router.navigate([sessionStorage.getItem('previous_url') || '/']);
    Helpers.removeSpinner();
  }

  showPassword() {
    this.show = !this.show;
    if (this.show) {
        this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  isFieldValid(attr, field: string) {
    return !this.signIn.get(attr).get(field).valid && this.signIn.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
