import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewsComponent } from '@clicca-webapp/web/news/news.component';
import { NewsListComponent } from '@clicca-webapp/web/news/news-list/news-list.component';
import { NewsDetailComponent } from '@clicca-webapp/web/news/news-detail/news-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent, data: { title: 'Notícias' },
        children: [
          { path: '', component: NewsListComponent },
          { path: ':id', component: NewsDetailComponent },
        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
