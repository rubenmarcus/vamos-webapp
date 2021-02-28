import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalServerErrorComponent } from '@clicca-webapp/web/error/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from '@clicca-webapp/web/error/not-found/not-found.component';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedWebModule,
  ],
  declarations: [
    NotFoundComponent,
    InternalServerErrorComponent
  ],
  exports: [NotFoundComponent, InternalServerErrorComponent]
})
export class ErrorModule { }
