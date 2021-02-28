import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '@clicca-webapp/web/card/home/home.component';
import { CardPaymentCCComponent } from '@clicca-webapp/web/card/payments/credit-card/credit-card.component';
import { CardComponent } from '@clicca-webapp/web/card/card.component';
import { BenefitsComponent } from '@clicca-webapp/web/card/home/benefits/benefits.component';
import { RechargeComponent } from '@clicca-webapp/web/card/payments/recharge/recharge.component';
import { CardDependentComponent } from '@clicca-webapp/web/card/home/card-dependent/card-dependent.component';
import { MyDependentsComponent } from '@clicca-webapp/web/card/home/my-dependents/my-dependents.component';
import { AddDependentComponent } from '@clicca-webapp/web/card/home/add-dependent/add-dependent.component';
import { EditProfileComponent } from '@clicca-webapp/web/card/home/edit-profile/edit-profile.component';
import { CardPaymentBoletoComponent } from '@clicca-webapp/web/card/payments/boleto/boleto.component';
import { CardPaymentsComponent } from './payments/payments.component';
import { CardPaymentMonthlyComponent } from '@clicca-webapp/web/card/payments/monthly/monthly.component';
import { CardPaymentSuccessComponent } from '@clicca-webapp/web/card/payments/success/success.component';
import { CardPaymentWaitingPaymentComponent } from '@clicca-webapp/web/card/payments/waiting-payment/waiting-payment.component';
import { CardNetworkComponent } from './network/network.component';
import { AuthenticationGuardService } from '@clicca-webapp/shared/services/guard-service/authentication-guard.service';
import { UrlCheckComponent } from './url-check/url-check.component';
import { CardResolveService } from '@clicca-webapp/shared/services/card-service/card-resolve.service';
import { DependentResolveService } from '@clicca-webapp/shared/services/card-service/dependent-resolve.service';
import { ExcludeDependentComponent } from '@clicca-webapp/web/card/exclude-dependent/exclude-dependent.component';
import { ScheduleComponent } from '@clicca-webapp/web/card/schedule/schedule.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        runGuardsAndResolvers: 'always',
        component: CardComponent, data: { title: 'Cartão' }, 
        children: [
          { path: '', component: UrlCheckComponent , data: { title: 'Cartão' }, resolve: {user: CardResolveService} },
          { path: 'agendamento', component: ScheduleComponent , data: { title: 'Agendamento' },   canActivate: [AuthenticationGuardService] , resolve: {dependent: DependentResolveService}},
          { path: 'excluir-dependente', component: ExcludeDependentComponent , data: { title: 'Excluir Dependente' }},
          { path: 'pagamento', component: CardPaymentCCComponent, data: { title: 'Pagamento' } ,  canActivate: [AuthenticationGuardService]},
          { path: 'detalhes', component: HomeComponent, data: { title: 'Detalhes do Cartão' } ,  canActivate: [AuthenticationGuardService]},
          { path: 'meus-dependentes', component: MyDependentsComponent, data: { title: 'Meus Dependentes' },  canActivate: [AuthenticationGuardService] , resolve: {dependent: DependentResolveService}  },
          { path: 'meus-dependentes/:id', component: AddDependentComponent, data: { title: 'Editar Dependente' },  canActivate: [AuthenticationGuardService] , resolve: {dependent: DependentResolveService}  },
          { path: 'adicionar-dependente', component: AddDependentComponent, data: { title: 'Adicionar Dependentes' } ,  canActivate: [AuthenticationGuardService]},
          { path: 'editar-perfil', component: EditProfileComponent, data: { title: 'Editar Perfil' },  canActivate: [AuthenticationGuardService]},
            { path: 'beneficios', component: BenefitsComponent, data: { title: 'Benefícios' },  resolve: {user: CardResolveService} },
            { path: 'aguardando-pagamento', component: CardPaymentWaitingPaymentComponent, data: { title: 'Aguardando Pagamento' },  canActivate: [AuthenticationGuardService]},
            { path: 'aguardando-pagamento-2', component: RechargeComponent, data: { title: 'Aguardando Pagamento' },  canActivate: [AuthenticationGuardService]},
            { path: 'recarga', component: CardPaymentsComponent, data: { title: 'Recarga' } ,  canActivate: [AuthenticationGuardService],
              children: [
                { path: '', component: RechargeComponent, data: { title: 'Recarga' }},
                { path: 'em-andamento', component: RechargeComponent, data: { title: 'Recarga' }},
                { path: '/cartao/', component: CardPaymentCCComponent, data: { title: 'Recarga' }},
          ]
          } ,
        { path: 'pagar/sucesso', component: CardPaymentSuccessComponent, data: { title: 'Mensalidade' } ,  canActivate: [AuthenticationGuardService]},
        { path: 'pagar/:id', component: CardPaymentMonthlyComponent, data: { title: 'Mensalidade' } ,  canActivate: [AuthenticationGuardService]},
        { path: 'pagar', component: CardPaymentMonthlyComponent, data: { title: 'Mensalidade' } ,  canActivate: [AuthenticationGuardService]},
        { path: 'rede-credenciada', component: CardNetworkComponent, data: { title: 'Rede Credenciada' } ,  canActivate: [AuthenticationGuardService]},
        { path: 'agendamento-consultas', component: CardComponent, data: { title: 'Agendamento de Consultas' } ,canActivate: [AuthenticationGuardService]},
        // { path: 'mensalidade', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento Mensalidade' } ,
        //     children: [
        //       { path: '', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento Mensalidade' }},
        //       { path: '/pagar/:id', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento Mensalidade' }},
        //     //  { path: 'em-andamento', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento em Andamento' }},
        //     //  { path: 'sucesso', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento Realizado com Sucesso' }},
        //     //  { path: 'primeira', component: CardPaymentMonthlyComponent, data: { title: 'Pagamento Realizado com Sucesso' }},
        //  ]
        // } ,
        ],
    
      },
      
    ]),
  ],
  exports: [RouterModule]
})
export class CardRoutingModule {}
