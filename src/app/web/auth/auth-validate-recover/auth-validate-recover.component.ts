import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { AuthenticateService } from '@clicca-webapp/shared/services/authenticator-service/authenticate-service/authenticate.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Alert } from '@clicca-webapp/shared/class/alert';

@Component({ preserveWhitespaces: false,
  selector: 'app-auth-validate-recover',
  templateUrl: './auth-validate-recover.component.html',
  styleUrls: ['./auth-validate-recover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthValidateRecoverComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() user;
  @Output() backLogin = new EventEmitter;
  public codeForm: FormGroup;
  public codeMask = InputMask.codeMask;
  public messageError = MessageError;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticateService: AuthenticateService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
   console.log(this.user);
    this.createFormCode();
    this.getUser();
  }

  createFormCode(): void {
    const login = '';
    this.codeForm = this.formBuilder.group({
      user: this.formBuilder.group({
        login: [''],
        recover_code: ['', [Validators.required, Validators.minLength(6)]]
      })
    });
  }

  getUser() {
      this.codeForm.get('user').get('login').setValue(this.getLogin());
  }

  formatNumber() {
    return `(${this.user.phone.slice(0, 2)}) *****-${this.user.phone.slice(this.user.phone.length-4)}`;
  }

  formatEmail() {
    const mail = this.user.email.split('@');
    const name = mail[0].slice(0, 2);
    return `${name}*****@${mail[1]}`;
  }

  isPerson(): boolean {
    return this.user.type === 'Person' ? true : false;
  }

  getLogin(): string {
    return this.isPerson() ? this.user.profile.cpf : this.user.email;
  }

  backtoLogin(){
    this.backLogin.emit(true);
  }
  resendActivationToken(kind) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.resendActivationToken(this.user.id, kind).subscribe(res => {
        Alert.success(res.message);
        Helpers.removeSpinner();
      })
    );
  }

  validateRecover() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.authenticateService.validateRecover(this.codeForm.value).subscribe(res => {
        Helpers.removeSpinner();
        User.saveCache(res, localStorage.getItem('logged_in'));
        sessionStorage.setItem('usertoken', sessionStorage.getItem('access_token'))


        this.router.navigate([sessionStorage.getItem('previous_url') || '/']);
      })
    );

    //event.setAttribute('disabled','true');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
