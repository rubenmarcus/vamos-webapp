import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { BlockCanalDaPecaComponent } from './block-canal-da-peca/block-canal-da-peca.component';
import { BlockNetworkComponent } from './block-network/block-network.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
    declarations: [ServicesComponent, BlockCanalDaPecaComponent, BlockNetworkComponent, DashboardComponent],
    imports: [CommonModule, ServicesRoutingModule, SharedModule, SharedWebModule],
    exports: [ServicesComponent]
})
export class ServicesModule {}
