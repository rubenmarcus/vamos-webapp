import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { PushService } from '@clicca-webapp/shared/services/push-service/push-service.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
  title = 'app';
  message: any;
  msg: any;
  msgTitle;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private msgService: PushService,
  ) {
    localStorage.removeItem('firebase:host:vamos-mais.firebaseio.com');
  }
 

  ngOnInit() {
  //  this.msgService.startNotication();
    this.checkRoute();
    // this.setTitle();
  }

 

   

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  // setTitle() {
  //   this.router.events
  //     .filter((event) => event instanceof NavigationEnd)
  //     .map(() => this.activatedRoute)
  //     .map((route) => {
  //       while (route.firstChild) route = route.firstChild;
  //       return route;
  //     })
  //     .filter((route) => route.outlet === 'primary')
  //     .mergeMap((route) => route.data)
  //     .subscribe((event) => this.titleService.setTitle('clicCA - ' + event['title']));
  // }

  checkRoute() {
    this.router.events
    .filter(e => e instanceof NavigationEnd)
    .pairwise().subscribe((e) => {
      const previous = <NavigationEnd>e[0];
      const url = previous.url;
      if ( !/\/account|\/refresh|\/login|\/cadastro|\/esqueci-senha|\/404|\/500|\/webview/.test(url) ) {
        sessionStorage.setItem('previous_url', url);
      }
    });
  }

}
