import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebviewComponent } from './webview.component';

import { WebviewPaymentSuccessFreeComponent } from './webview-payment-success-free/webview-payment-success-free.component';
import { WebviewErrorComponent } from '@clicca-webapp/webview/webview-error/webview-error.component';

import { WebviewTemRechargeComponent } from './webview-tem-recharge/webview-tem-recharge.component';
import { WebviewTemPaymentComponent } from './webview-tem-payment/webview-tem-payment.component';

import { WebviewPlansComponent } from '@clicca-webapp/webview/webview-plans/webview-plans.component';
import { WebviewPlansHomeComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-home/webview-plans-home.component';
import { WebviewPlansTermsComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-terms/webview-plans-terms.component';
import { WebviewPlansExclusiveFormComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-exclusive-form/webview-plans-exclusive-form.component';
import { WebviewPlansPaymentComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment.component';
import { WebviewPlansPaymentDataComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment-data/webview-plans-payment-data.component';
import { WebviewPlansPaymentAddressComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment-address/webview-plans-payment-address.component';
import { WebviewPlansPaymentCardComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment-card/webview-plans-payment-card.component';
import { WebviewPlansPaymentSuccessComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment-success/webview-plans-payment-success.component';
import { WebviewPlansPaymentSuccessFreeComponent } from '@clicca-webapp/webview/webview-plans/webview-plans-payment/webview-plans-payment-success-free/webview-plans-payment-success-free.component';
import { MobileResolveCurrentPlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-resolve-current-plan/mobile-resolve-current-plan.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: WebviewComponent, data: { title: 'Mobile' },
        children: [
          { path: 'plan', component: WebviewPlansComponent, data: { title: 'Mobile' },
            children: [
              { path: '', component: WebviewPlansHomeComponent, data: { title: 'Mobile' }, resolve: { currentPlan: MobileResolveCurrentPlanService } },
              { path: 'terms/:offer_plan_id', component: WebviewPlansTermsComponent, data: { title: 'Mobile' } },
              { path: 'exclusive', component: WebviewPlansExclusiveFormComponent, data: { title: 'Mobile' } },

              { path: 'payment', component: WebviewPlansPaymentComponent, data: { title: 'Mobile' },
                children: [
                  { path: 'data/:offer_plan_id', component: WebviewPlansPaymentDataComponent, data: { title: 'Mobile' } },
                  { path: 'address/:offer_plan_id', component: WebviewPlansPaymentAddressComponent, data: { title: 'Mobile' } },
                  { path: 'card/:offer_plan_id', component: WebviewPlansPaymentCardComponent, data: { title: 'Mobile' } },
                  { path: 'success/:offer_plan_id', component: WebviewPlansPaymentSuccessComponent, data: { title: 'Mobile' } },
                  { path: 'success', component: WebviewPlansPaymentSuccessFreeComponent, data: { title: 'Mobile' } },
                ]
              },
            ]
          },

          { path: 'error', component: WebviewErrorComponent, data: { title: 'Mobile' } },

          { path: 'tem-payment', component: WebviewTemPaymentComponent , data: { title: 'Mobile' }, },
          { path: 'tem-recharge-success', component: WebviewPaymentSuccessFreeComponent , data: { title: 'Mobile' }, },
          { path: 'tem-recharge', component: WebviewTemRechargeComponent , data: { title: 'Mobile' }, },
          { path: 'tem-payment-success', component: WebviewPaymentSuccessFreeComponent , data: { title: 'Mobile' }, },
        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class WebviewRoutingModule {}
