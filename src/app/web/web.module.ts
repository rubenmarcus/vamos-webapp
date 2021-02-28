import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlModule } from 'ng2-owl-carousel';

import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
import { WebComponent } from './web.component';
import { WebRoutingModule } from '@clicca-webapp/web/web-routing.module';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { PushService } from '@clicca-webapp/shared/services/push-service/push-service.service';
import { firebaseConfig } from 'environments/firebase.config';
import { ErrorModule } from '@clicca-webapp/web/error/error.module';

firebase.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    CurrencyMaskModule,
    TextMaskModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

    WebRoutingModule,
    SharedModule,
    SharedWebModule,
    ErrorModule
  ],
  declarations: [
    WebComponent
  ],
  exports: [
  ],
  providers: [
    PushService,
    AngularFireAuth,
  ],
})
export class WebModule { }
