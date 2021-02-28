import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { OffersRoutingModule } from '@clicca-webapp/web/offers/offers-routing.module';

import { AdvertiseComponent } from '@clicca-webapp/web/offers/advertise/advertise.component';
import { AdvertiseCategoryComponent } from './advertise-category/advertise-category.component';
import { AdvertisePhotosComponent } from './advertise-photos/advertise-photos.component';
import { AdvertiseAboutComponent } from './advertise-about/advertise-about.component';
import { AdvertiseOptionalsComponent } from './advertise-optionals/advertise-optionals.component';
// import { AdvertisePriceComponent } from './advertise-price/advertise-price.component';
import { AdvertiseCompanyComponent } from './advertise-company/advertise-company.component';
import { AdvertiseVehicularBusComponent } from './shared/vehicular/advertise-vehicular-bus/advertise-vehicular-bus.component';
import { AdvertiseVehicularHarvesterComponent } from './shared/vehicular/advertise-vehicular-harvester/advertise-vehicular-harvester.component';
import { AdvertiseVehicularHeavyVehicleComponent } from './shared/vehicular/advertise-vehicular-heavy-vehicle/advertise-vehicular-heavy-vehicle.component';
import { AdvertiseVehicularSprayerComponent } from './shared/vehicular/advertise-vehicular-sprayer/advertise-vehicular-sprayer.component';
import { AdvertiseVehicularTractorAgriculturalComponent } from './shared/vehicular/advertise-vehicular-tractor-agricultural/advertise-vehicular-tractor-agricultural.component';
import { AdvertiseVehicularTruckComponent } from './shared/vehicular/advertise-vehicular-truck/advertise-vehicular-truck.component';
import { AdvertiseImplementalComponent } from './shared/implemental/advertise-implemental/advertise-implemental.component';
import { AdvertiseImplementalBalerComponent } from './shared/implemental/advertise-implemental-baler/advertise-implemental-baler.component';
import { AdvertiseImplementalDistributorComponent } from './shared/implemental/advertise-implemental-distributor/advertise-implemental-distributor.component';
import { AdvertiseImplementalDrillerComponent } from './shared/implemental/advertise-implemental-driller/advertise-implemental-driller.component';
import { AdvertiseImplementalForageComponent } from './shared/implemental/advertise-implemental-forage/advertise-implemental-forage.component';
import { AdvertiseImplementalForageHarvesterComponent } from './shared/implemental/advertise-implemental-forage-harvester/advertise-implemental-forage-harvester.component';
import { AdvertiseImplementalForageWagonComponent } from './shared/implemental/advertise-implemental-forage-wagon/advertise-implemental-forage-wagon.component';
import { AdvertiseImplementalGraderGradeComponent } from './shared/implemental/advertise-implemental-grader-grade/advertise-implemental-grader-grade.component';
import { AdvertiseImplementalGrainExtractorComponent } from './shared/implemental/advertise-implemental-grain-extractor/advertise-implemental-grain-extractor.component';
import { AdvertiseImplementalGrainStufferComponent } from './shared/implemental/advertise-implemental-grain-stuffer/advertise-implemental-grain-stuffer.component';
import { AdvertiseImplementalHarvesterComponent } from './shared/implemental/advertise-implemental-harvester/advertise-implemental-harvester.component';
import { AdvertiseImplementalMixerWagonComponent } from './shared/implemental/advertise-implemental-mixer-wagon/advertise-implemental-mixer-wagon.component';
import { AdvertiseImplementalPlanerComponent } from './shared/implemental/advertise-implemental-planer/advertise-implemental-planer.component';
import { AdvertiseImplementalPlowComponent } from './shared/implemental/advertise-implemental-plow/advertise-implemental-plow.component';
import { AdvertiseImplementalRakeComponent } from './shared/implemental/advertise-implemental-rake/advertise-implemental-rake.component';
import { AdvertiseImplementalSeedDrillComponent } from './shared/implemental/advertise-implemental-seed-drill/advertise-implemental-seed-drill.component';
import { AdvertiseImplementalSprayerComponent } from './shared/implemental/advertise-implemental-sprayer/advertise-implemental-sprayer.component';
import { AdvertiseImplementalTrimmerComponent } from './shared/implemental/advertise-implemental-trimmer/advertise-implemental-trimmer.component';
import { AdvertiseImplementalTruckBodyComponent } from './shared/implemental/advertise-implemental-truck-body/advertise-implemental-truck-body.component';
import { AdvertiseImplementalWaterPumpComponent } from './shared/implemental/advertise-implemental-water-pump/advertise-implemental-water-pump.component';
import { AdvertiseImplementalWinchComponent } from './shared/implemental/advertise-implemental-winch/advertise-implemental-winch.component';
import { FormImplemental } from '@clicca-webapp/web/offers/advertise/shared/class/form-implemental';
import { FormBuilderVehicleModule } from '@clicca-webapp/web/offers/advertise/shared/class/form-builder-vehicle-module';
import { FormBuilderAdvertiseModule } from '@clicca-webapp/web/offers/advertise/shared/class/form-builder-advertise-module';
import { AdvertiseVehicularComponent } from './shared/vehicular/advertise-vehicular/advertise-vehicular.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedWebModule,
    OffersRoutingModule,
    CurrencyMaskModule,
    TextMaskModule
  ],
  declarations: [
    AdvertiseComponent,
    AdvertiseCategoryComponent,
    AdvertisePhotosComponent,
    AdvertiseAboutComponent,
    AdvertiseOptionalsComponent,
    // AdvertisePriceComponent,
    AdvertiseCompanyComponent,
    AdvertiseVehicularBusComponent,
    AdvertiseVehicularHarvesterComponent,
    AdvertiseVehicularHeavyVehicleComponent,
    AdvertiseVehicularSprayerComponent,
    AdvertiseVehicularTractorAgriculturalComponent,
    AdvertiseVehicularTruckComponent,
    AdvertiseImplementalComponent,
    AdvertiseImplementalBalerComponent,
    AdvertiseImplementalDistributorComponent,
    AdvertiseImplementalDrillerComponent,
    AdvertiseImplementalForageComponent,
    AdvertiseImplementalForageHarvesterComponent,
    AdvertiseImplementalForageWagonComponent,
    AdvertiseImplementalGraderGradeComponent,
    AdvertiseImplementalGrainExtractorComponent,
    AdvertiseImplementalGrainStufferComponent,
    AdvertiseImplementalHarvesterComponent,
    AdvertiseImplementalMixerWagonComponent,
    AdvertiseImplementalPlanerComponent,
    AdvertiseImplementalPlowComponent,
    AdvertiseImplementalRakeComponent,
    AdvertiseImplementalSeedDrillComponent,
    AdvertiseImplementalSprayerComponent,
    AdvertiseImplementalTrimmerComponent,
    AdvertiseImplementalTruckBodyComponent,
    AdvertiseImplementalWaterPumpComponent,
    AdvertiseImplementalWinchComponent,
    AdvertiseVehicularComponent
  ],
  exports: [
    FormImplemental,
    FormBuilderVehicleModule,
    FormBuilderAdvertiseModule,
  ]
})
export class AdvertiseModule { }
