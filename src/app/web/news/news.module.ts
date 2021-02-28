import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from '@clicca-webapp/web/news/news-routing.module';
import { SharedModule } from '@clicca-webapp/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SharedWebModule } from '@clicca-webapp/web/shared/shared.web.module';
// import { NgxXml2jsonService } from 'ngx-xml2json';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    SharedWebModule,
    // NgxXml2jsonService
  ],
  providers: [],
  declarations: [NewsComponent, NewsListComponent, NewsDetailComponent]
})
export class NewsModule { }
