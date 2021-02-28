import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlModule } from 'ng2-owl-carousel';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WebviewRoutingModule } from '@clicca-webapp/webview/webview-routing.module';
import { WebviewFormBuilderModule } from '@clicca-webapp/webview/webview-plans/shared/class/webview-form-builder-module';

import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { WebviewPlansComponent } from './webview-plans.component';
import { WebviewPlansTermsComponent } from './webview-plans-terms/webview-plans-terms.component';
import { WebviewPlansHomeComponent } from './webview-plans-home/webview-plans-home.component';
import { WebviewPlansExclusiveFormComponent } from './webview-plans-exclusive-form/webview-plans-exclusive-form.component';
import { WebviewPlansPaymentComponent } from './webview-plans-payment/webview-plans-payment.component';
import { WebviewPlansPaymentAddressComponent } from './webview-plans-payment/webview-plans-payment-address/webview-plans-payment-address.component';
import { WebviewPlansPaymentCardComponent } from './webview-plans-payment/webview-plans-payment-card/webview-plans-payment-card.component';
import { WebviewPlansPaymentDataComponent } from './webview-plans-payment/webview-plans-payment-data/webview-plans-payment-data.component';
import { WebviewPlansPaymentSuccessComponent } from './webview-plans-payment/webview-plans-payment-success/webview-plans-payment-success.component';
import { WebviewPlansPaymentSuccessFreeComponent } from './webview-plans-payment/webview-plans-payment-success-free/webview-plans-payment-success-free.component';
import { WebviewPlansHomeCardComponent } from './webview-plans-home/webview-plans-home-card/webview-plans-home-card.component';

import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';
import { MobileUserService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-user-service/mobile-user.service';
import { MobileResolveCurrentPlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-resolve-current-plan/mobile-resolve-current-plan.service';
import { WebviewPlansFreeCardComponent } from './webview-plans-home/webview-plans-free-card/webview-plans-free-card.component';

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
    WebviewFormBuilderModule
  ],
  declarations: [
    WebviewPlansComponent,
    WebviewPlansTermsComponent,
    WebviewPlansHomeComponent,
    WebviewPlansExclusiveFormComponent,
    WebviewPlansPaymentComponent,
    WebviewPlansPaymentAddressComponent,
    WebviewPlansPaymentCardComponent,
    WebviewPlansPaymentDataComponent,
    WebviewPlansPaymentSuccessComponent,
    WebviewPlansPaymentSuccessFreeComponent,
    WebviewPlansHomeCardComponent,
    WebviewPlansFreeCardComponent
  ],
  providers: [
    MobilePlanService,
    MobileUserService,
    MobileResolveCurrentPlanService
  ],
})
export class WebviewPlansModule { }
