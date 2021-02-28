import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';


import { environment } from 'environments/environment';

@Injectable()

@Component({ preserveWhitespaces: false,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit, AfterViewInit{
  public session: boolean;
  versionOut;
  loaded;
  initiated;
  build = true;
  constructor(private http: Http) { }

  ngOnInit() {    
    this.session = new SessionChecker().isSessionStarted;
    this.initiated = false;
    this.version();
   if(environment.production) {
      this.build = false;

   }
   // console.log('Session', this.session , new SessionChecker().isSessionStarted)
  }
  ngAfterViewInit(){

    this.initiated = true;
  }


    version(){
    return this.http.get('./assets/version.json')
    .subscribe(res => {
          this.versionOut = res.json();
          // console.log('Res', this.versionOut);
          this.loaded = true;
            }
        );
      
     
    }
}
