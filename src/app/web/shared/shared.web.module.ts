import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { OwlModule } from 'ng2-owl-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HeaderProfileComponent } from './header/header-profile/header-profile.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BannersComponent } from './banners/banners.component';
import { BoxCollapseComponent } from './box/box-collapse/box-collapse.component';
import { BoxContentComponent } from './box/box-content/box-content.component';
import { BoxRoundedComponent } from './box/box-rounded/box-rounded.component';
import { BoxContentScrollComponent } from './box/box-content-scroll/box-content-scroll.component';
import { TagComponent } from './tag/tag/tag.component';
import { TagSmallComponent } from './tag/tag-small/tag-small.component';
import { CardOfferComponent } from './offers/card-offer/card-offer.component';
import { CardVehicleComponent } from './offers/card-vehicle/card-vehicle.component';
import { CardFreightComponent } from './freights/card-freight/card-freight.component';
import { BlockFreightsComponent } from './freights/block-freights/block-freights.component';
import { FlexcontactComponent } from './flexcontact/flexcontact.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OwlModule,
    CurrencyMaskModule,
    TextMaskModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    AnimateOnScrollModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    HeaderProfileComponent,
    FooterComponent,
    PaginationComponent,
    GalleryComponent,
    BannersComponent,
    BoxCollapseComponent,
    BoxContentComponent,
    BoxRoundedComponent,
    BoxContentScrollComponent,
    TagComponent,
    TagSmallComponent,
    CardOfferComponent,
    CardVehicleComponent,
    CardFreightComponent,
    BlockFreightsComponent,
    FlexcontactComponent,
  ],
  exports: [
    HeaderComponent,
    HeaderProfileComponent,
    FooterComponent,
    PaginationComponent,
    GalleryComponent,
    BannersComponent,
    BoxCollapseComponent,
    BoxContentComponent,
    BoxRoundedComponent,
    BoxContentScrollComponent,
    TagComponent,
    TagSmallComponent,
    CardOfferComponent,
    CardVehicleComponent,
    CardFreightComponent,
    BlockFreightsComponent,
  ],
  providers: [
  ],
})
export class SharedWebModule { }
