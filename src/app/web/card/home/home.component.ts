import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute,Routes, Router, NavigationEnd} from '@angular/router';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

import { Helpers } from '@clicca-webapp/shared/class/helpers';


@Component({ preserveWhitespaces: false,
  selector: 'app-card-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  @Input() userCard;
  private user = User.fromCache();
  public userInfo = [];
  public mainUser;
  public dependents = [];
  seeIfDependent = false;
  isMain = true;
  selected;
  dependentId;
  public ownerId;
  public loaded = false;
  public cardNumber;
  public MainCard;
  public cardDetails;
  public hasExpired;
  public expire;
  public cardStatus;
  public cardInfo;
  navigationSubscription;

  constructor(
    public router: Router,
    private cardService: CardService,
    private route: ActivatedRoute, ) {

     }

  ngOnInit() { 
    this.getCard();
  }

  reloadPage() {
    this.router.navigateByUrl('/cartao/excluir-dependente').then(() => {
      this.router.navigateByUrl('/cartao');
      });
  }

  getCard() {
    Helpers.applySpinner();
    const cardInfo = this.userCard;
    const cardOwner = this.userCard.owner;
    this.expire = this.userCard.expires_at;
    this.cardStatus = this.userCard.status;
    this.userInfo = cardOwner.card_user;
    this.mainUser = cardOwner.card_user;
    this.ownerId = cardOwner.account_id;
    this.dependents = this.filterDependent(cardInfo.dependents);
    // console.log('UI', this.userCard);
    this.setInfo(cardOwner);
    this.checkifExpired(cardInfo.expires_at);
    // console.log('expires at' ,     this.checkifExpired(cardInfo.expires_at));
    this.isMain = true;
    this.loaded = true;
    Helpers.removeSpinner();
  }

  setInfo(owner){
    if (owner.number) {
      this.cardNumber = owner.number;
      this.MainCard = owner.number;
      this.cardDetails = {
        cvv: owner.cvv,
        product: owner.product,
        emitter: owner.emitter,
        way:owner.way,
      };
    } else {
      this.cardNumber = '0000000000000000';
      this.MainCard = '0000000000000000';
      this.cardDetails = {
        cvv: '000',
        product: owner.product,
        emitter: owner.emitter,
        way: 1,
      }
    }
  }

  checkifExpired(expirationDate){
    const today = new Date().toJSON().slice(0, 10);
    if ( expirationDate > today ) {
     this.hasExpired = false;
     return false;
    } else {
     this.hasExpired = true;
     return true;
    }
  }

  filterDependent(dependents) {
    return dependents.filter(element => {
      return element.status === 'active';
    });
  }

  showDependent(dependent) {
        // console.log(dependent);
        this.userInfo = dependent.card_user;
        if (dependent.number === null) {
          this.cardNumber = '0000000000000000';
        } else {
          this.cardNumber = dependent.number;
        }
        this.seeIfDependent = true;
        this.selected = dependent;
        this.isMain = false;
        this.dependentId = dependent.id;
   }

  showMainUser() {
    this.userInfo = this.mainUser;
    this.seeIfDependent = false;
    this.isMain = true;
    this.selected = false;
    this.dependentId = '';
    this.cardNumber = this.MainCard;
   }

    isActive(dependent) {
      return this.selected === dependent;
    }

}