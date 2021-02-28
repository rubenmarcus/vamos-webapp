import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { environment } from 'environments/environment';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';

@Injectable()
export class HeaderService {
  session: boolean;
  constructor() { }

  setHeader(params?: any): RequestOptions {
    // console.log('AT', User.fromCache().access_token);
    
    const helper = new SessionChecker();
    this.session = helper.isSessionStarted;
    const headers: Headers = new Headers();
    headers.append('Authorization', environment.authentication_token);
    headers.append('Device-Type', 'Web');
    headers.append('Device-Name', 'Angular2');
    headers.append('Device-Version', '5');

    if (this.session) {
      const access_token = sessionStorage.getItem('access_token');
      console.log('token', access_token);
      headers.append('user', User.fromCache().id);
      headers.append('Access-Token', access_token );
    }

    const options = new RequestOptions({headers: headers, params: params });
    return options;
  }


  valRecoverHeader(params?: any): RequestOptions {
    const helper = new SessionChecker();
    this.session = helper.isSessionStarted;
    const headers: Headers = new Headers();
    headers.append('Authorization', environment.authentication_token);
    headers.append('Device-Type', 'Web');
    headers.append('Device-Name', 'Angular2');
    // eaders.append('Access-Token', sessionStorage.getItem('access_token'));
    headers.append('Device-Version', '5');

    if (this.session) {
      headers.append('user', User.fromCache().id);
    }

    const options = new RequestOptions({ headers: headers, params: params });
    return options;
  }


  loginHeader(params?: any): RequestOptions {
    const helper = new SessionChecker();
    this.session = helper.isSessionStarted;
    const headers: Headers = new Headers();
    headers.append('Authorization', environment.authentication_token);
    headers.append('Device-Type', 'Web');
    headers.append('Device-Name', 'Angular2');

    console.log('Access Token 2' , sessionStorage.getItem('access_token'), sessionStorage.getItem('usertoken'));

    headers.append('Access-Token', sessionStorage.getItem('access_token'));
    headers.append('Device-Version', '5');

    if (this.session) {
      headers.append('user', User.fromCache().id);
    }

    const options = new RequestOptions({ headers: headers, params: params });
    return options;
  }


  temHeader(params?: any): RequestOptions{
    const headers: Headers = new Headers();

    headers.append('Transaction-Key', environment.tem_transaction_key);
    const options = new RequestOptions({ headers: headers, params: params  });
    return options;
  }

  TemNetwork(params?: any): RequestOptions{
    const headers: Headers = new Headers();
    headers.append('Authorization', environment.tem_authorization);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const options = new RequestOptions({ headers: headers, params: params  });
    return options;
  }

  TemToken(token?: any): RequestOptions{
    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

}
