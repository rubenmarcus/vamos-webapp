import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { BenefitsComponent } from './home/benefits/benefits.component';
import { HomeComponent } from './home/home.component';
import { RechargeComponent } from './payments/recharge/recharge.component';
import { CardPaymentsComponent } from './payments/payments.component';
import { CardRoutingModule } from '@clicca-webapp/web/card/card-routing.module';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { CardDetailsComponent } from './home/card-details/card-details.component';
import { CardInfoComponent } from './home/card-info/card-info.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CardDependentComponent } from './home/card-dependent/card-dependent.component';
import { MyDependentsComponent } from './home/my-dependents/my-dependents.component';
import { AddDependentComponent } from './home/add-dependent/add-dependent.component';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NetworkModule } from '@clicca-webapp/web/network/network.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardPaymentBoletoComponent } from './payments/boleto/boleto.component';
import { CardPaymentWaitingPaymentComponent } from './payments/waiting-payment/waiting-payment.component';
import { CardPaymentMonthlyComponent } from './payments/monthly/monthly.component';
import { CardPaymentCCComponent } from './payments/credit-card/credit-card.component';
import { CardPaymentSuccessComponent } from './payments/success/success.component';
import { CardNetworkComponent } from './network/network.component';
import { CardNetworkListComponent } from './network/list/list.component';
import { CardNetworkSearchComponent } from './network/search/search.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { UrlCheckComponent } from './url-check/url-check.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
import { ExcludeDependentComponent } from './exclude-dependent/exclude-dependent.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    CardComponent,
    BenefitsComponent,
    HomeComponent,
    RechargeComponent,
    CardPaymentMonthlyComponent,
    CardPaymentCCComponent,
    CardDetailsComponent,
    CardInfoComponent,
    CardDependentComponent,
    MyDependentsComponent,
    AddDependentComponent,
    EditProfileComponent,
    CardPaymentsComponent,
    CardPaymentBoletoComponent,
    CardPaymentWaitingPaymentComponent,
    CardPaymentSuccessComponent,
    CardNetworkComponent,
    CardNetworkListComponent,
    CardNetworkSearchComponent,
    UrlCheckComponent,
    ExcludeDependentComponent,
    ScheduleComponent,
  ],
  imports: [
    GooglePlaceModule,
    CommonModule,
    CardRoutingModule,
    SharedModule,
    SharedWebModule,
    CurrencyMaskModule,
    NetworkModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpp9tS1DyvOctKNwn0TS07LUEiRA9tVz8',
      apiVersion: '3.26',
      libraries: ['places']
    }),
    AgmDirectionModule,
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  exports: [CardComponent]
})
export class CardModule {}
