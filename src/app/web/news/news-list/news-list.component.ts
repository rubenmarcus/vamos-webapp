import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsService } from '@clicca-webapp/shared/services/news-service/news.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
// import { xmlToJson, xml2json } from '@clicca-webapp/shared/class/xmlToJson';
// import { NgxXml2jsonService } from 'ngx-xml2json';

// import { parser } from 'xml2js';

// import xml2js from 'xml2js';

// declare var require: any;
// var parser = require('xml2json');

@Component({ preserveWhitespaces: false,
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public news;

  public xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:rawvoice="http://www.rawvoice.com/rawvoiceRssModule/" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0/play-podcasts.xsd"></rss>`

  constructor(
    // private ngxXml2jsonService: NgxXml2jsonService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getNews();
    // const result = xml2json(this.news, '');
    // console.log(this.news)

    // var json = parser.toJson(this.xml);
    // console.log("to json -> %s", json);
    console.log(this.xml);
  }

  getNews() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.newsService.index().subscribe(
        result => {
          // var json = parser.toJson(result);
          // console.log("to json -> %s", json);

          // const test = xmlToJson(result._body);
          // console.log(test);
          Helpers.removeSpinner();
        },
        error => {
          console.log(error);
          Helpers.removeSpinner();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
