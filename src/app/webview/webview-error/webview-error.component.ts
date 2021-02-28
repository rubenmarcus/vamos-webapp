import { Component, OnInit } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-error',
  templateUrl: './webview-error.component.html',
  styleUrls: ['./webview-error.component.scss']
})
export class WebviewErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.clear();
    localStorage.clear();
  }

}
