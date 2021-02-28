import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OffersComponent } from './offers.component';
import { ListComponent } from './list/list.component';
import { ItemDetailComponent } from '@clicca-webapp/web/offers/item-detail/item-detail.component';
import { HasInterestComponent } from '@clicca-webapp/web/offers/has-interest/has-interest.component';
import { FinanceComponent } from '@clicca-webapp/web/offers/finance/finance.component';
import { AnalysisComponent } from '@clicca-webapp/web/offers/analysis/analysis.component';
import { AddVehicleComponent } from '@clicca-webapp/web/offers/add-vehicle/add-vehicle.component';
import { VehiclePriceComponent } from '@clicca-webapp/web/offers/add-vehicle/vehicle-price/vehicle-price.component';
import { DenounceComponent } from '@clicca-webapp/web/offers/denounce/denounce.component';
import { AdvertiseComponent } from '@clicca-webapp/web/offers/advertise/advertise.component';
import { AdvertiseCategoryComponent } from '@clicca-webapp/web/offers/advertise/advertise-category/advertise-category.component';
import { AdvertisePhotosComponent } from '@clicca-webapp/web/offers/advertise/advertise-photos/advertise-photos.component';
import { AdvertiseAboutComponent } from '@clicca-webapp/web/offers/advertise/advertise-about/advertise-about.component';
import { AdvertiseOptionalsComponent } from '@clicca-webapp/web/offers/advertise/advertise-optionals/advertise-optionals.component';
import { AdvertiseCompanyComponent } from '@clicca-webapp/web/offers/advertise/advertise-company/advertise-company.component';
import { AuthenticationGuardService } from '@clicca-webapp/shared/services/guard-service/authentication-guard.service';
import { CurrentPlanResolveService } from '@clicca-webapp/shared/services/plan-service/current-plan-resolve.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OffersComponent,
        children: [
          // {path: '', redirectTo: 'lista'},
          {path: '', redirectTo: 'caminhoes'},
          { path: 'lista', component: ListComponent, data: { title: 'Lista de Classificados'} },
          { path: 'detalhes/:id', component: ItemDetailComponent, data: { title: 'Detalhes do Anúncio' } },
          { path: 'simular-financiamento', component: FinanceComponent, data: { title: 'Simular Financiamento' } },
          { path: 'simular-financiamento/:id', component: FinanceComponent, data: { title: 'Simular Financiamento' } },
          { path: 'tenho-interesse/:id', component: HasInterestComponent, canActivate: [AuthenticationGuardService], data: { title: 'Tenho Interesse' } },
          { path: 'analise-credito', component: AnalysisComponent, canActivate: [AuthenticationGuardService], data: { title: 'Pré-análise de Crédito' } },
          // { path: 'pagseguro', component: VehiclePriceComponent, data: { title: 'Pag Seguro' } },
          { path: 'denunciar/:id', component: DenounceComponent, data: { title: 'Denunciar Anúncio' } },

          { path: 'anuncios', component: AdvertiseComponent, canActivate: [AuthenticationGuardService], data: { title: 'Anúncios' },
          // Advertisement
            children: [
              { path: '', component: AdvertiseCompanyComponent, data: { title: 'Anúncios' } },
              { path: 'categoria/:advertiser_id', component: AdvertiseCategoryComponent, data: { title: 'Anúncios' } },
              { path: 'sobre/:advertiser_id', component: AdvertiseAboutComponent, data: { title: 'Anúncios' } },
              { path: 'sobre/:advertiser_id/:id', component: AdvertiseAboutComponent, data: { title: 'Anúncios' } },
              { path: 'fotos/:advertiser_id/:id', component: AdvertisePhotosComponent, data: { title: 'Anúncios' }, resolve: { currentPlan: CurrentPlanResolveService } },
              { path: 'opcionais/:advertiser_id/:id', component: AdvertiseOptionalsComponent, data: { title: 'Anúncios' } },
              // { path: 'ocultar-placa', component: HidePlateComponent, data: { title: 'Ocultar Placa' } },
              // { path: 'seu-veiculo', component: YourVehicleComponent, },
            ]
          },
          { path: ':name', component: ListComponent, data: { title: 'Lista de Classificados'   } },
        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class OffersRoutingModule {}
