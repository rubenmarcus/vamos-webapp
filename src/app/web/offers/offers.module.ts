
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NouisliderModule } from 'ng2-nouislider';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ShareButtonsModule } from '@ngx-share/buttons';

// Offers Components
import { OffersComponent } from './offers.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HasInterestComponent } from './has-interest/has-interest.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { FinanceComponent } from './finance/finance.component';
import { DenounceComponent } from './denounce/denounce.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehiclePriceComponent } from './add-vehicle/vehicle-price/vehicle-price.component';
import { ListComponent } from './list/list.component';
import { LeftMenuComponent } from './list/list-left-menu/left-menu.component';
import { VehicleSelectComponent } from './list/list-left-menu/vehicle-select/vehicle-select.component';
import { LocalizationComponent } from './list/list-left-menu/localization/localization.component';
import { ConditionComponent } from './list/list-left-menu/condition/condition.component';
import { PriceComponent } from './list/list-left-menu/price/price.component';
import { DistanceComponent } from './list/list-left-menu/distance/distance.component';
import { ChangeComponent } from './list/list-left-menu/change/change.component';
import { ItemHeadComponent } from './item-detail/item-head/item-head.component';
import { ItemBodyComponent } from './item-detail/item-body/item-body.component';
import { TableComponent } from './item-detail/table/table.component';
import { SellerComponent } from './item-detail/seller/seller.component';

// Routing Module
import { OffersRoutingModule } from './offers-routing.module';
import { HomeModule } from '@clicca-webapp/web/home/home.module';
import { MenuColorComponent } from './list/list-left-menu/menu-color/menu-color.component';
import { MenuNegotiationComponent } from './list/list-left-menu/menu-negotiation/menu-negotiation.component';
import { MenuYearComponent } from './list/list-left-menu/menu-year/menu-year.component';
import { MenuBodyTypeComponent } from './list/list-left-menu/menu-body-type/menu-body-type.component';
import { AdvertiseModule } from '@clicca-webapp/web/offers/advertise/advertise.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OffersRoutingModule,
    SharedModule,
    SharedWebModule,
    HomeModule,
    NouisliderModule,
    AdvertiseModule,
    TextMaskModule,
    CurrencyMaskModule,
    ShareButtonsModule.forRoot(),
    HttpClientModule,       // for share counts
    HttpClientJsonpModule,
  ],
  declarations: [
    OffersComponent,
    ItemDetailComponent,
    HasInterestComponent,
    AnalysisComponent,
    FinanceComponent,
    DenounceComponent,
    AddVehicleComponent,
    // VehicleTypeComponent,
    // YourVehicleComponent,
    VehiclePriceComponent,
    // HidePlateComponent,
    // AboutVehicleComponent,
    LeftMenuComponent,
    ListComponent,
    VehicleSelectComponent,
    LocalizationComponent,
    ConditionComponent,
    PriceComponent,
    DistanceComponent,
    ChangeComponent,
    ItemHeadComponent,
    ItemBodyComponent,
    TableComponent,
    SellerComponent,
    MenuColorComponent,
    MenuNegotiationComponent,
    MenuYearComponent,
    MenuBodyTypeComponent,
  ],
  exports: [OffersComponent, ItemDetailComponent, ReactiveFormsModule]
})
export class OffersModule {}
