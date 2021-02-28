import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@clicca-webapp/shared/shared.module';

import { FreightsComponent } from './freights.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { LocalizationComponent } from './sidebar/localization/localization.component';
// import { VehicleTypesComponent } from './sidebar/vehicle-types/vehicle-types.component';
import { ListComponent } from './list/list.component';
import { AddVehicleComponent } from './my-vehicles/add-vehicle/add-vehicle.component';
import { AddComponent } from './my-vehicles/add-vehicle/register-vehicle/add/add.component';
import { RegisterVehicleComponent } from './my-vehicles/add-vehicle/register-vehicle/register-vehicle.component';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';
import { ListVehiclesComponent } from './my-vehicles/list-vehicles/list-vehicles.component';
import { DetailsFreightsComponent } from './details-freights/details-freights.component';

//Routes Module
import { FreightsRoutingModule } from '@clicca-webapp/web/freights/freights-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
import { DetailsFreightsDirectionsComponent } from './details-freights/details-freights-directions/details-freights-directions.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    FreightsComponent,
    SidebarComponent,
    // LocalizationComponent,
    // VehicleTypesComponent,
    ListComponent,
    AddVehicleComponent,
    RegisterVehicleComponent,
    AddComponent,
    MyVehiclesComponent,
    ListVehiclesComponent,
    DetailsFreightsComponent,
    DetailsFreightsDirectionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FreightsRoutingModule,
    SharedModule,
    SharedWebModule,
    ShareButtonsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpp9tS1DyvOctKNwn0TS07LUEiRA9tVz8',
      apiVersion: "3.26"
    }),
    AgmDirectionModule,
    HttpClientModule,       // for share counts
    HttpClientJsonpModule,
  ],
  exports: [FreightsComponent]
})

export class FreightsModule { }
