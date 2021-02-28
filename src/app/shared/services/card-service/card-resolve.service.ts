import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { CardService } from './card-service.service';

import { Subscription } from 'rxjs/Rx';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

@Injectable()
export class CardResolveService {

  constructor(
    private cardService: CardService,
    private profileService: ProfileService
  ) { }

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BehaviorSubject<any>|Observable<any>|Promise<any>|any {
 
    return this.getUser();
  }

getUser() {
  return new Promise((resolve, reject) => {
    const parsed = JSON.parse(localStorage.getItem('session')) || JSON.parse(sessionStorage.getItem('session'));

        if (this.user === null) {
          const obj = {
              type: 'not-logged',
              cardShow: 'benefits'
            };
          resolve(obj);
    } else {
      // console.log('UserId', parsed.id);
      this.subscriptions.push(
        this.cardService.getOwner(parsed.id).subscribe(res => {
          if (res.length === 0 ) {
            if (parsed.profile_type === 'Company') {
              const userObj = {
                cardShow: 'benefits',
                type: 'no-card'
              };
              resolve(userObj);
  
            } else {
            // Is Dependent?
            this.subscriptions.push(
              this.profileService.info(User.fromCache().id).subscribe(response => {
                this.cardService.getCard(response.profile.cpf).subscribe(resp => {
                  if (resp[0]){
                    const userObj = { dependent: resp[0] , cardShow: 'dependent'};
                    resolve(userObj);
                  } else {
                    // Isnt Dependent , logged but no card
                    const userObj = {
                      cardShow: 'benefits',
                      type: 'no-card'
                    };
                    resolve(userObj);
                  }
                 });
              })
            );
          }
        } else {
            switch (res[0].status) {
              case 'active':
              {
                 const userObj = { cardShow: 'card' , card: res[0]};
                 resolve(userObj);
                 break;
              }
              case 'suspend':
              {
                 const userObj = { cardShow: 'card', card: res[0]};
                 resolve(userObj);
                 break;
              }
              case 'incomplete':
              {
                 const userObj = { type:'incomplete', cardShow: 'benefits', card: res[0]};
                 resolve(userObj);
                 break;
              }
            case 'waiting_payment':
              {
                const userObj = { cardShow: 'waiting'};
                resolve(userObj);
                break;
              }
            case 'initiated':
              {
                const userObj = { cardShow: 'waiting'};
                resolve(userObj);
                break;
              }
              case 'pre_registration':
              {
                const userObj = {
                  cardShow: 'benefits',
                  type: 'pre-register'
                };
                resolve(userObj);
                break;
              }
            default:
              {
                const userObj = {
                  cardShow: 'benefits',
                  type: 'logged'
                };
                resolve(userObj);
                break;
              }
          }
        }
        })
      );

  }
  
  });
 }

}
