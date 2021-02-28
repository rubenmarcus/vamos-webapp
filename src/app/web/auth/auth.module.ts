import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';

import { CompanyComponent } from './register/company/company.component';
import { PersonComponent } from './register/person/person.component';
import { AuthComponent } from './auth.component';
import { AuthValidateRecoverComponent } from './auth-validate-recover/auth-validate-recover.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
    SharedWebModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    CompanyComponent,
    PersonComponent,
    AuthComponent,
    AuthValidateRecoverComponent
  ],
})
export class AuthModule {}
