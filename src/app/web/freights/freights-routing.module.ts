import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FreightsComponent } from './freights.component';
import { ListComponent } from  './list/list.component';
import { AddVehicleComponent } from './my-vehicles/add-vehicle/add-vehicle.component';
import { RegisterVehicleComponent } from './my-vehicles/add-vehicle/register-vehicle/register-vehicle.component';
import { MyVehiclesComponent } from '@clicca-webapp/web/freights/my-vehicles/my-vehicles.component';
import { DetailsFreightsComponent } from '@clicca-webapp/web/freights/details-freights/details-freights.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FreightsComponent, data: {title: 'Fretes'},
        children: [
          // { path: '', redirectTo: 'fretes' },
          { path: '', component: ListComponent, data: { title: 'Lista de Fretes' } },
          { path: 'meus-veiculos', component: MyVehiclesComponent, data: { title: 'Meus Veículos' } },
          { path: 'adicionar-veiculo', component: AddVehicleComponent, data: { title: 'Adicionar Veículos' } },
          { path: 'cadastrar-veiculo', component: RegisterVehicleComponent, data: { title: 'Cadastrar Veículo' } },
          { path: 'detalhes-frete', component: DetailsFreightsComponent, data: { title: 'Detalhes do frete' } },
          { path: ':id', component: DetailsFreightsComponent, data: { title: 'Detalhes do frete' } },
        ]
      },
    ])
  ],
  exports: [RouterModule]
})

export class FreightsRoutingModule {}

