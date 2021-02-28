import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans',
  templateUrl: './webview-plans.component.html',
  styleUrls: ['./webview-plans.component.scss']
})
export class WebviewPlansComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if ( !this.route.snapshot.queryParams.user_id || !this.route.snapshot.queryParams.ip ) {
      this.router.navigate([`/webview/error`]);
    }
  }

}
