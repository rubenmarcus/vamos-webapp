import { AddressComponent } from './profile/address/address.component';
import { MyDataComponent } from './profile/my-data/my-data.component';
import { MyDataPersonComponent } from './profile/my-data/person/person.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from '@clicca-webapp/web/user/user.component';
import { MyOffersComponent } from '@clicca-webapp/web/user/my-offers/my-offers.component';
import { OfferDetailComponent } from '@clicca-webapp/web/user/offer-detail/offer-detail.component';
import { FavoritesComponent } from '@clicca-webapp/web/user/favorites/favorites.component';
import { ProfileComponent } from '@clicca-webapp/web/user/profile/profile.component';
import { PasswordComponent } from '@clicca-webapp/web/user/profile/password/password.component';
import { PlansComponent } from '@clicca-webapp/web/user/plans/plans.component';
import { ChatComponent } from '@clicca-webapp/web/user/chat/chat.component';
import { MyOffersListComponent } from '@clicca-webapp/web/user/my-offers/my-offers-list/my-offers-list.component';
import { PaymentComponent } from '@clicca-webapp/web/user/plans/payment/payment.component';
import { FavTabFreightsComponent } from '@clicca-webapp/web/user/favorites/tab-freights/tab-freights.component';
import { FavTabAllComponent } from '@clicca-webapp/web/user/favorites/tab-all/tab-all.component';
import { FavTabOfferComponent } from '@clicca-webapp/web/user/favorites/tab-offer/tab-offer.component';
import { MessagesComponent } from '@clicca-webapp/web/user/messages/messages.component';

import { PlansHomeComponent } from '@clicca-webapp/web/user/plans/home/home.component';
import { CurrentPlanResolveService } from '@clicca-webapp/shared/services/plan-service/current-plan-resolve.service';
import { UserResolveService } from '@clicca-webapp/shared/services/profile-service/user-resolve.service';
import { MyOfferResolveService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/my-offer-resolve.service';
import { AuthenticationGuardService } from '@clicca-webapp/shared/services/guard-service/authentication-guard.service';
import { PlanPaymentSuccessFreeComponent } from '@clicca-webapp/web/user/plans/payment/plan-payment-success-free/plan-payment-success-free.component';

import { MyStoresComponent } from '@clicca-webapp/web/user/profile/my-stores/my-stores.component';
import { MyStoresCompanyComponent } from '@clicca-webapp/web/user/profile/my-stores/my-stores-company/my-stores-company.component';
import { PlanRequestsSuccessComponent } from '@clicca-webapp/web/user/plans/plan-requests-success/plan-requests-success.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent, data: { title: 'Meu Perfil' },
        canActivate: [AuthenticationGuardService],
        children: [
          { path: '', redirectTo: 'meus-dados' },
          {
            path: 'meus-dados', component: ProfileComponent , data: { title: 'Meus Dados' },
            children: [
              { path: '', component: MyDataComponent, data: { title: 'Meus Dados' } },
              { path: 'endereco', component: AddressComponent, data: { title: 'Endereço' } },
              { path: 'anunciante', component: MyStoresComponent, data: { title: 'Dados do Anunciante' }},
              { path: 'anunciante/editar/:id', component: MyStoresCompanyComponent, data: { title: 'Editar Anunciante' }, },
              { path: 'anunciante/cadastrar', component: MyStoresCompanyComponent, data: { title: 'Cadastrar  Anunciante' }},
              { path: 'alterar-senha', component: PasswordComponent , data: { title: 'Alterar Senha' }},
            ]
          },
          {
            path: 'favoritos', component: FavoritesComponent , data: { title: 'Meus Favoritos' },
            children: [
              {path: '', redirectTo: 'todos'},
              { path: 'todos', component: FavTabAllComponent , data: { title: 'Meus Favoritos - Todos' }},
              { path: 'fretes', component: FavTabFreightsComponent , data: { title: 'Meus Favoritos - Fretes' }},
              { path: 'classificados', component: FavTabOfferComponent , data: { title: 'Meus Favoritos - Classificados' }},
            ]
          },
          {
            path: 'meus-anuncios', component: MyOffersComponent , data: { title: 'Meus Anúncios' },
            children: [
              { path: '', component: MyOffersListComponent, data: { title: 'Meus Anúncios' }, resolve: { currentPlan: CurrentPlanResolveService, vehicleActive: MyOfferResolveService } },
              { path: ':status', component: MyOffersListComponent, data: { title: 'Meus Anúncios' }, resolve: { currentPlan: CurrentPlanResolveService, vehicleActive: MyOfferResolveService } },
            ]
          },
          { path: 'detalhe-oferta/:id', component: OfferDetailComponent , data: { title: 'Detalhe Anúncio' } },
          { path: 'planos', component: PlansComponent , data: { title: 'Planos' }, resolve: { currentPlan: CurrentPlanResolveService },
            children: [
              { path: '', component: PlansHomeComponent , data: { title: 'Planos' }, resolve: { currentPlan: CurrentPlanResolveService } },
              { path: 'exclusivo/sucesso', component: PlanRequestsSuccessComponent , data: { title: 'Plano Exclusivo' }, resolve: { user: UserResolveService } },
              { path: 'pagamento/sucesso', component: PlanPaymentSuccessFreeComponent , data: { title: 'Pagamento' }, resolve: { user: UserResolveService } },
              { path: 'pagamento/:offer_plan_id', component: PaymentComponent , data: { title: 'Pagamento' }, resolve: { user: UserResolveService } },
            ]
          },
          { path: 'mensagens', component: MessagesComponent , data: { title: 'Mensagens' } },
          { path: 'chat', component: ChatComponent , data: { title: 'Chat' } },
          { path: 'chat/:conversation/:to_id/:offer_id', component: ChatComponent , data: { title: 'Chat' } },
  
        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
