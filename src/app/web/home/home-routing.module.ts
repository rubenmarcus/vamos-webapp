import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from '@clicca-webapp/web/home/about/about.component';
import { DashboardComponent } from '@clicca-webapp/web/home/dashboard/dashboard.component';
import { PrivacyPolicyComponent } from '@clicca-webapp/web/home/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from '@clicca-webapp/web/home/terms-of-use/terms-of-use.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent, data: { title: 'Home' },
        children: [
          { path: '', component: DashboardComponent, data: { title: 'Home' , contentHeight: '2000px'} },
          { path: 'sobre', component: AboutComponent, data: { title: 'Sobre a clicCA' } },
          { path: 'politica-de-privacidade', component: PrivacyPolicyComponent, data: { title: 'Política de Privacidade' } },
          { path: 'termos-de-uso', component: TermsOfUseComponent, data: { title: 'Termos de Uso' } },
          { path: 'fale-conosco', component: ContactComponent , data: { title: 'Fale Conosco' } },

        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
