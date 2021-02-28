import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { AuthComponent } from './auth.component';
import { LoginGuardService } from '@clicca-webapp/shared/services/guard-service/login-guard.service';
import { AuthValidateRecoverComponent } from '@clicca-webapp/web/auth/auth-validate-recover/auth-validate-recover.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {path: '', redirectTo: 'login'},
          { path: 'login', component: LoginComponent, canActivate: [LoginGuardService], data: { title: 'Login' } },
          { path: 'register', component: RegisterComponent, canActivate: [LoginGuardService] , data: { title: 'Cadastro' } },
          { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuardService] , data: { title: 'Esqueceu a Senha' } }
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
