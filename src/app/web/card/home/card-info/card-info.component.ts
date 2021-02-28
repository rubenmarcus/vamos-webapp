import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { Subscription } from 'rxjs/Rx';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Alert } from '@clicca-webapp/shared/class/alert';


@Component({ preserveWhitespaces: false,
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardInfoComponent implements OnInit, OnDestroy  {
  modal = false;
  payments = [];

  private subscriptions: Subscription[] = [];
  @Input() UserData;
  @Input() isDependent;
  @Input() DependentId;
  @Input() ownerData;
  @Output() reload = new EventEmitter;
  @Input() cardn;
  @Input() cardDetails;
  @Input() expired;
  @Input() expire;
  payment_link;
  @Input() cardStatus;
  free = true;
  public hasExpired;
  modalDependent = false;
  cardBg = false;
  constructor(
    private cardService: CardService) { }

  ngOnInit() {
    this.payment_link = '/cartao/pagar/';
    this.getPayments();
    this.getPromotion();
    // console.log(this.cardStatus);
   // console.log(this.cardStatus);
  }
  openDependent() {
    this.modalDependent = true;
  }
  closeModalDependent() {
    this.modalDependent = false;
  }

  removeDependent() {
    Helpers.applySpinner();
    this.closeModalDependent();
 
    this.subscriptions.push(
      this.cardService.removeDependent(this.DependentId , 'archive').subscribe(res => {
       this.reload.emit(true);
       Alert.success('Dependente Excluido com Sucesso.');
       Helpers.removeSpinner();
     },
       error => {
         Alert.error(error.error.message);
         Helpers.removeSpinner();
       }
     )
    );
  }

  checkifExpired(expirationDate){
    const today = new Date().toJSON().slice(0, 10);
    if ( expirationDate <= today ) {
     this.hasExpired = true;
    } else {
      this.hasExpired = false;
    }
  }


  getPayments() {
    this.subscriptions.push(
      this.cardService.getPayments(this.ownerData).subscribe(res => {
        this.payments = res.objects;
        if (res.objects.length  > 1 && !this.expired) {
          this.free = true;
        } else {
          this.free = false;
        }
       }
     )
    );
  }

  getPromotion() {
    this.subscriptions.push(
      this.cardService.getPromotion().subscribe(res => {
           // console.log(res.promotional_date);
           this.checkifExpired(res.promotional_date);
          console.log('date', this.checkifExpired(res.promotional_date));
       }
     )
    );
  }

  mcc(v){
    v = v.replace(/\D/g,""); // Permite apenas dígitos
    v = v.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'') // Coloca um ponto a cada 4 caracteres
    v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
    v = v.substring(0, 19)// Limita o tamanho

    return v;
  }

  clickCard() {
    if(!this.cardBg) {
      this.cardBg = true; 
    } else {
      this.cardBg = false;
    }
  }

  openModal() {this.modal = true; }
  closeModal() {this.modal = false; }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
