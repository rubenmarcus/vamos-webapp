import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';

import { Component, OnInit, AfterContentInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit{

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    localStorage.removeItem('firebase:previous_websocket_failure');
    }
  

  ngOnInit() {
    this.setTitle();
  }
 
  setTitle() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle('clicCA - ' + event['title']));
  }

  scrollForTopPage(): void {
    this.router.events.filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
    });
 
  
  }
}

