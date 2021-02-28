import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlModule } from 'ng2-owl-carousel';

import { SharedModule } from '@clicca-webapp/shared/shared.module';

import { WebviewRoutingModule } from '@clicca-webapp/webview/webview-routing.module';
import { WebviewComponent } from './webview.component';

import { WebviewTemPaymentComponent } from '@clicca-webapp/webview/webview-tem-payment/webview-tem-payment.component';
import { WebviewTemRechargeComponent } from './webview-tem-recharge/webview-tem-recharge.component';

import { WebviewPaymentSuccessFreeComponent } from './webview-payment-success-free/webview-payment-success-free.component';
import { WebviewErrorComponent } from './webview-error/webview-error.component';
import { WebviewPlansModule } from '@clicca-webapp/webview/webview-plans/webview-plans.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OwlModule,
    CurrencyMaskModule,
    TextMaskModule,
    ReactiveFormsModule,
    FormsModule,
    WebviewRoutingModule,
    WebviewPlansModule
  ],
  declarations: [
    WebviewComponent,
    WebviewPaymentSuccessFreeComponent,
    WebviewTemPaymentComponent,
    WebviewTemRechargeComponent,
    WebviewErrorComponent,
  ],
  providers: [ ],
})
export class WebviewModule { }
