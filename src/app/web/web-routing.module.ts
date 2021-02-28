import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebComponent } from '@clicca-webapp/web/web.component';

import { NotFoundComponent } from '@clicca-webapp/web/error/not-found/not-found.component';
import { InternalServerErrorComponent } from '@clicca-webapp/web/error/internal-server-error/internal-server-error.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: WebComponent,
        children: [
          // View Modules
          { path: '', loadChildren: '@clicca-webapp/web/home/home.module#HomeModule'},
          { path: 'account', loadChildren: '@clicca-webapp/web/auth/auth.module#AuthModule' },
          { path: 'classificados', loadChildren: '@clicca-webapp/web/offers/offers.module#OffersModule'},
          { path: 'fretes', loadChildren: '@clicca-webapp/web/freights/freights.module#FreightsModule'},
          { path: 'network', loadChildren: '@clicca-webapp/web/network/network.module#NetworkModule'},
          { path: 'perfil', loadChildren: '@clicca-webapp/web/user/user.module#UserModule'},
          { path: 'servicos', loadChildren: '@clicca-webapp/web/services/services.module#ServicesModule'},
          { path: 'cartao', loadChildren: '@clicca-webapp/web/card/card.module#CardModule'},

          { path: 'noticias', loadChildren: '@clicca-webapp/web/news/news.module#NewsModule'},

          // Redirects
          { path: 'cadastro', redirectTo: '/account/register', pathMatch: 'full'},
          { path: 'login', redirectTo: '/account/login', pathMatch: 'full'},
          { path: 'esqueci-senha', redirectTo: '/account/forgot-password', pathMatch: 'full'},
          { path: '404', component: NotFoundComponent, data: { title: 'Página não Encontrada' }, },
          { path: '500', component: InternalServerErrorComponent, data: { title: 'Ocorreu um erro' }, },
        ]
      }
    ])
  ],
  exports: [RouterModule]
})

export class WebRoutingModule {}
