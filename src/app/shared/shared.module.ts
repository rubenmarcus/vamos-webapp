import { AuthenticateService } from './services/authenticator-service/authenticate-service/authenticate.service';
import { HeaderService } from './services/header-service/header.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconsModule } from './icons/icons.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Services
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { ComponentsService } from '@clicca-webapp/shared/services/vehicle-selling/components-service/components.service';
import { BrandsService } from '@clicca-webapp/shared/services/vehicle-selling/brands-service/brands.service';
import { ModelsService } from '@clicca-webapp/shared/services/vehicle-selling/models-service/models.service';
import { FreightsService } from '@clicca-webapp/shared/services/freights-service/freights.service';

import { MessagesService } from '@clicca-webapp/shared/services/vehicle-selling/messages-service/messages.service';
import { ViewersService } from '@clicca-webapp/shared/services/vehicle-selling/viewers-service/viewers.service';
import { FavoritesService } from '@clicca-webapp/shared/services/vehicle-selling/favorites-service/favorites.service';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { DenounceService } from '@clicca-webapp/shared/services/vehicle-selling/denounce-service/denounce.service';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';
import { GetCepService } from '@clicca-webapp/shared/services/profile-service/get-cep.service';
import { AdvertisersService } from '@clicca-webapp/shared/services/vehicle-selling/advertisers-service/advertisers.service';

import { FinanceService } from '@clicca-webapp/shared/services/vehicle-selling/finance-service/finance.service';
import { UserService } from '@clicca-webapp/shared/services/profile-service/user.service';
import { NetworkService } from '@clicca-webapp/shared/services/network-service/network.service';
import { BannerService } from '@clicca-webapp/shared/services/banners-service/banner.service';

import { CanalDaPecaService } from '@clicca-webapp/shared/services/canal-da-peca/canal-da-peca.service';
import { MessageService } from '@clicca-webapp/shared/services/profile-service/message.service';

import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { CurrentPlanResolveService } from '@clicca-webapp/shared/services/plan-service/current-plan-resolve.service';
import { PagseguroCardService } from '@clicca-webapp/shared/services/plan-service/pagseguro-card.service';
import { UserResolveService } from '@clicca-webapp/shared/services/profile-service/user-resolve.service';
import { CardResolveService } from '@clicca-webapp/shared/services/card-service/card-resolve.service';

import { MyOfferResolveService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/my-offer-resolve.service';
import { AuthenticationGuardService } from '@clicca-webapp/shared/services/guard-service/authentication-guard.service';
import { LoginGuardService } from '@clicca-webapp/shared/services/guard-service/login-guard.service';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';
import { ContentServiceService } from '@clicca-webapp/shared/services/authenticator-service/content-service/content-service.service';

import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { NewsService } from '@clicca-webapp/shared/services/news-service/news.service';
import { TemService } from '@clicca-webapp/shared/services/tem-service/tem-service.service';
import { FaleConoscoService } from '@clicca-webapp/shared/services/profile-service/fale-conosco.service';

import { TruncatePipe } from './pipes/truncate.pipe';
import { DependentResolveService } from '@clicca-webapp/shared/services/card-service/dependent-resolve.service';
import { ScheduleService } from '@clicca-webapp/shared/services/schedule-service/schedule-service.service';

@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpp9tS1DyvOctKNwn0TS07LUEiRA9tVz8',
      apiVersion: "3.26"
    }),
    AgmDirectionModule
  ],
  providers: [
    HeaderService,
    AuthenticateService,
    OffersService,
    ComponentsService,
    BrandsService,
    ModelsService,
    MessagesService,
    ViewersService,
    FavoritesService,
    FreightsService,
    DenounceService,
    ProfileService,
    CepService,
    AdvertisersService,
    FinanceService,
    UserService,
    UserService,
    NetworkService,
    BannerService,
    CanalDaPecaService,
    MessageService,
    OfferPlansService,
    CurrentPlanResolveService,
    PagseguroCardService,
    UserResolveService,
    MyOfferResolveService,
    AuthenticationGuardService,
    LoginGuardService,
    ErrorHandlerService,
    CardService,
    NewsService,
    ContentServiceService,
    CardResolveService,
    DependentResolveService,
    TemService,
    FaleConoscoService,
    GetCepService,
    ScheduleService
  ],
  exports: [
    IconsModule,
    TruncatePipe
  ]
})
export class SharedModule { }
