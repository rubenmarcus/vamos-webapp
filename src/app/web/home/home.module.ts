import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@clicca-webapp/shared/shared.module';

import { BlockFreightsComponent } from './block-freights/block-freights.component';
import { BlockOffersComponent } from './block-offers/block-offers.component';
import { BlockAdsComponent } from './block-ads/block-ads.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SharedWebModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
  ],
  declarations: [
    HomeComponent,
    BlockFreightsComponent,
    BlockOffersComponent,
    BlockAdsComponent,
    AboutComponent,
    DashboardComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    ContactComponent
  ],
  exports: [
    HomeComponent,
    BlockOffersComponent
  ]
})
export class HomeModule {}
