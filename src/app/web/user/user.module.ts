import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from '@clicca-webapp/web/user/user-routing.module';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlModule } from 'ng2-owl-carousel';

// Components

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { UserLeftMenuComponent } from './left-menu/left-menu.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { UserHeaderComponent } from '@clicca-webapp/web/user/header/header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavTabFreightsComponent } from './favorites/tab-freights/tab-freights.component';
import { FavTabOfferComponent } from './favorites/tab-offer/tab-offer.component';
import { FavTabAllComponent } from './favorites/tab-all/tab-all.component';
import { AddressComponent } from './profile/address/address.component';
import { PasswordComponent } from './profile/password/password.component';
import { MyDataComponent } from './profile/my-data/my-data.component';
import { MyDataPersonComponent } from './profile/my-data/person/person.component';
import { PlansComponent } from './plans/plans.component';
import { PaymentComponent } from './plans/payment/payment.component';
import { ChatComponent } from './chat/chat.component';
import { TypeComponent } from './chat/type/type.component';
import { BoxUserComponent } from './chat/box-user/box-user.component';
import { DialogComponent } from './chat/dialog/dialog.component';
import { SubjectComponent } from './chat/subject/subject.component';
import { MyDataCompanyComponent } from './profile/my-data/company/company.component';
import { MyOffersListComponent } from './my-offers/my-offers-list/my-offers-list.component';
import { PlansHomeComponent } from './plans/home/home.component';
import { FreightsModule } from '@clicca-webapp/web/freights/freights.module';
import { MessagesComponent } from './messages/messages.component';

import { PlanCardComponent } from './plans/plan-card/plan-card.component';
import { PlanPaymentDataComponent } from './plans/payment/plan-payment-data/plan-payment-data.component';
import { PlanPaymentCardComponent } from './plans/payment/plan-payment-card/plan-payment-card.component';
import { PlanPaymentSuccessFreeComponent } from './plans/payment/plan-payment-success-free/plan-payment-success-free.component';
import { MyStoresComponent } from './profile/my-stores/my-stores.component';
import { MyStoresBranchesComponent } from './profile/my-stores/my-stores-branches/my-stores-branches.component';
import { MyStoresPersonComponent } from './profile/my-stores/my-stores-person/my-stores-person.component';
import { MyStoresCompanyComponent } from './profile/my-stores/my-stores-company/my-stores-company.component';
import { ProfileTabComponent } from './profile/profile-tab/profile-tab.component';
import { PlanRequestsSuccessComponent } from './plans/plan-requests-success/plan-requests-success.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
import { PlanCardFreeComponent } from './plans/plan-card-free/plan-card-free.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedWebModule,
    NgbModule,
    UiSwitchModule,
    CurrencyMaskModule,
    TextMaskModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    OwlModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent,
    MyOffersComponent,
    UserHeaderComponent,
    UserLeftMenuComponent,
    OfferDetailComponent,
    FavoritesComponent,
    FavTabFreightsComponent,
    FavTabOfferComponent,
    FavTabAllComponent,
    AddressComponent,
    PasswordComponent,
    MyDataComponent,
    MyDataPersonComponent,
    MyDataCompanyComponent,
    PlansComponent,
    PaymentComponent,
    ChatComponent,
    TypeComponent,
    BoxUserComponent,
    SubjectComponent,
    DialogComponent,
    MyOffersListComponent,
    PlansHomeComponent,
    MyOffersListComponent,
    PlanCardComponent,
    PlanPaymentDataComponent,
    PlanPaymentCardComponent,
    MessagesComponent,
    PlanPaymentSuccessFreeComponent,
    MyStoresComponent,
    MyStoresBranchesComponent,
    MyStoresPersonComponent,
    MyStoresCompanyComponent,
    ProfileTabComponent,
    PlanRequestsSuccessComponent,
    PlanCardFreeComponent,
  ],
})
export class UserModule {}
