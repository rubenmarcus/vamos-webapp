import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServicesComponent } from '@clicca-webapp/web/services/services.component';
import { DashboardComponent } from '@clicca-webapp/web/services/dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ServicesComponent, data: { title: 'Serviços' },
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Serviços' } },
          ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
