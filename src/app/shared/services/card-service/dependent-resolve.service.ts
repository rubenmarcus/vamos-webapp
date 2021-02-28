import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { CardService } from './card-service.service';
import { Subscription } from 'rxjs/Rx';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

@Injectable()
export class DependentResolveService {

    private subscriptions: Subscription[] = [];
    private cpf;
    private user = User.fromCache();

  constructor(
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
   
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BehaviorSubject<any>|Observable<any>|Promise<any>|any {
    return this.getDependent(route.params['id']);
  }

  getDependent(id) {
    return new Promise((resolve, reject) => {
        this.subscriptions.push(
            this.cardService.getOwner(this.user.id).subscribe(res => {
                const DependentInfo = this.filterDependent(res[0].dependents, id, 'edit');
                const Dependents = this.filterDependent(res[0].dependents, '', '');
                if (id) {
                    // console.log(id, DependentInfo, res[0].dependents);
                    resolve(DependentInfo);
                } else {
                    // console.log(Dependents);
                    resolve(Dependents);
                }
            })
        );
    });
}


      filterDependent(dependent, id, type) {
        if (type === 'edit') {
            return dependent.filter(element => {
                return element.id === id;
            });
        } else {
            return dependent.filter(element => {
                return element.status === 'active';
            });
        }
      }


}