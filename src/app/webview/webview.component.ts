import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview',
  templateUrl: './webview.component.html',
  styleUrls: ['./webview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebviewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // if ( this.route.snapshot.data.profile.status !== 'active' ) {
    //   window.location.href = 'inapp://capture';
    // }
    document.body.className += 'webview';
  }

}
