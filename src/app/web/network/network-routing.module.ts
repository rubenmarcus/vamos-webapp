import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NetworkComponent } from '@clicca-webapp/web/network/network.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NetworkComponent, data: {title: 'Rede credenciada'},
      },
    ])
  ],
  exports: [RouterModule]
})

export class NetworkRoutingModule {}

