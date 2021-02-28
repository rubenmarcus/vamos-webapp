import { Component, OnInit,OnDestroy, ViewEncapsulation } from '@angular/core';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';


@Component({ preserveWhitespaces: false,
  selector: 'app-my-dependents',
  templateUrl: './my-dependents.component.html',
  styleUrls: ['./my-dependents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDependentsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private user;

  public notAdd = false;
  modal = false;
  DependentData;
  dependentLink = '/cartao/meus-dependentes';

  public dep = this.route.snapshot.data.dependent;


  constructor(private cardService: CardService,
               private route: ActivatedRoute, 
               public router: Router) { }

  ngOnInit() {
    this.user = User.fromCache();
    this.getCard();
  }

  getCard() {
    if(this.dep.length >= 5){
      this.notAdd = true;
    }
  }

  setDependent(dependent){
    this.DependentData = dependent;
    this.openModal();
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  removeDependent(dependent){
    Helpers.applySpinner();
    this.closeModal();
    this.subscriptions.push(
      this.cardService.removeDependent(dependent.id, 'archive').subscribe(res => {
        Alert.success('Dependente Excluido com Sucesso.');
        Helpers.removeSpinner();
        this.router.navigateByUrl('/cartao/excluir-dependente').then(() => {
          this.router.navigateByUrl('/cartao/meus-dependentes');
          });
        this.getCard();
      },
      error => {
        Alert.error(error.error.message);
        Helpers.removeSpinner();
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
