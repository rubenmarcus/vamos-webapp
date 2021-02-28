import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@clicca-webapp/shared/shared.module';

//Routes Module
import { NetworkRoutingModule } from './network-routing.module';
import { NetworkComponent } from '@clicca-webapp/web/network/network.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBoxComponent } from './shared/maps/search-box/search-box.component';
import { NetwotkListComponent } from './shared/maps/netwotk-list/netwotk-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
  declarations: [
    NetworkComponent,
    SearchBoxComponent,
    NetwotkListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpp9tS1DyvOctKNwn0TS07LUEiRA9tVz8',
      apiVersion: "3.26"
    }),
    AgmDirectionModule,
    NetworkRoutingModule,
    SharedModule,
    SharedWebModule,
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  exports: [NetworkComponent]
})

export class NetworkModule { }
