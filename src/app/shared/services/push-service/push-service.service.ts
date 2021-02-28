import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Headers, RequestOptions } from '@angular/http';
import { ErrorHandlerService } from '@clicca-webapp/shared/services/error-handler-service/error-handler.service';

// import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs';

import { DataHandler } from '@clicca-webapp/shared/class/data-handler';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Injectable()
export class PushService {

  private messaging;
  private currentMessage = new BehaviorSubject(null);
  private subscriptions: Subscription[] = [];

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private errorHandlerService: ErrorHandlerService,
    private profileService: ProfileService,
    private http: Http
  ) {
    if ( this.isPermissionNotification() ) {
      // this.messaging = firebase.messaging();
    }
  }

  isPermissionNotification(): boolean {
    var ua = navigator.userAgent.toLowerCase();
    return !/iPad|iPhone|iPod|MSIE|Trident|Edge/.test(navigator.userAgent) && ua.indexOf('safari') != -1 && ua.indexOf('chrome') > -1;
  }

  startNotication() {
    if ( this.isPermissionNotification() ) {
     // this.getPermission();
     // this.receiveMessage();
    }
  }

  getPermission() {
    this.messaging.requestPermission().then(() => {
      // console.log('Notification permission granted.');
      return this.messaging.getToken();
    }).then(token => {
      // console.log('token criado:', token);

      if ( User.fromCache() ) {
        const firebaseToken = User.fromCache().firebase_token;
        this.updateToken(firebaseToken);
        sessionStorage.setItem('firebase_token', firebaseToken);
      } else {
        this.updateToken(token);
        sessionStorage.setItem('firebase_token', token);

        // Subscribe to topics
        this.topics(token);
      }
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      this.currentMessage.next(payload.notification);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || `${environment.image_push}assets/img/logo_push.png`,
      };
      new Notification(notificationTitle,notificationOptions);
    });
  }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      const data = { firebase_token : token }
      this.db.object('fcmTokens/').update(data)
    });
  }

  topicSubscribe(token, topic): Observable<any> {
    const serverKey = environment.firebase_serverkey;

    const headers: Headers = new Headers();
    headers.append('Authorization', `key=${serverKey}`);
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {}, options)
      .map(DataHandler.handlerData)
      //.catch((error) => this.errorHandlerService.handleError(error) );
  }

  topics(token) {
    this.subscriptions.push(
      this.topicSubscribe(token, 'Web').subscribe(res => {  }),
      this.topicSubscribe(token, 'Android').subscribe( res => { } ),
      this.topicSubscribe(token, 'iOS').subscribe( res => { } ),
      this.topicSubscribe(token, 'platforms_all').subscribe( res => { } ),
      // this.topicSubscribe(token, 'plataforms_all').subscribe( res => { } )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
