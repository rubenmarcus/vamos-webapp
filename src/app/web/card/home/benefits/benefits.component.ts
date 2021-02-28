import { Component, OnInit, ViewEncapsulation, Input , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Routes, Router, ActivatedRoute} from '@angular/router';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { validateCellphoneBR, Cpf, validatePhone , IsAdultAge, IsChild, validateEmail, noEmoji} from '@clicca-webapp/shared/class/validator.method';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';



@Component({ preserveWhitespaces: false,
  selector: 'app-card-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BenefitsComponent implements OnInit, OnDestroy  {
  modal;
  terms;
  step1card;
  step2card;
  loaded;
  modalgetPreRegister = false;
  public inputMask = InputMask;
  preRegisterForm: FormGroup;
  public userInfo = this.route.snapshot.data.user;
  @Input() userType;
  @Input() userCard;

  public cpfMask = InputMask.cpfMask;

  private user = User.fromCache();
  public messageError = MessageError;

  private subscriptions: Subscription[] = [];


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cardService: CardService) { }

  ngOnInit() {
  //  console.log(this.userType);
  //   console.log('UI', this.userInfo);
    this.loadBenefits();
  }

  loadBenefits() {
   //  console.log('card status', this.userInfo.card.status);
    if (this.userType === 'not-logged'){
      this.userType = 'not-logged';
    }
   if (this.userType !== 'no-card' && this.userType !== undefined && this.userType !== 'pre-register' && this.userType !== 'not-logged'){
      if(this.userInfo.card.status){
        if (this.userInfo.card.status === 'active'){
          this.userType = 'logged';
        } 
        if(this.userInfo.card.status === 'archive' || this.userInfo.card.status === 'blocked'){
          this.userType = 'no-card';
        }
      }
    }  else {
      if( this.userType === undefined && this.user && this.userInfo.card.status === 'active'){
        this.userType = 'logged';
      }
      else if (this.userType === undefined && this.user) {
        this.userType = 'no-card';
        this.createFormUser();
      }  else if (!this.user) {
        this.userType = 'not-logged';
      } else {
        this.router.navigate(['/cartao']);
      }
    }
   //  console.log(this.userType);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  createFormUser() {
    this.preRegisterForm = this.formBuilder.group({
      account: this.formBuilder.group({
        user_id: this.user.id,
        status: 'pre_registration'
      }),
      card_user: this.formBuilder.group({
        first_name: [ '' ,  [Validators.required, noEmoji]],
        cpf: [ '' ,  [Validators.required , Cpf, noEmoji]],
        cellphone: [ '',  [Validators.required, validateCellphoneBR, noEmoji]],
        email: ['', [validateEmail, Validators.required, noEmoji]],
      })
    });
 
  }

  isFieldValid(field: string, attr = null ) {
    if(attr != null) {
       return !this.preRegisterForm.get('card_user').get(attr).get(field).valid && this.preRegisterForm.get('card_user').get(attr).get(field).touched;
      } else{
        return !this.preRegisterForm.get('card_user').get(field).valid && this.preRegisterForm.get('card_user').get(field).touched;
      }
  }


  openModal() {
    Helpers.applySpinner();
    this.modal = true;
    this.getTerms();
  }
  closeModal() {
    this.modal = false;
  }
  goStep2() {
    this.step1card = false;
    this.step2card = true;
  }

  closeModalPreRegister() {
    this.modalgetPreRegister = false;
  }

  openModalPreRegister() {
    this.createFormUser();
    this.loaded = true;
    this.modalgetPreRegister = true;
    this.step1card = true;
    this.step2card = false;
  }

  getTerms() {
    this.subscriptions.push(
      this.cardService.getTerms().subscribe(res => {
        // console.log(res);
        const el: HTMLElement = document.getElementById('terms_number');
        el.innerHTML = res.body;
        Helpers.removeSpinner();
      })
    );
  }

  submitForm() {
    if (ValidateForm.submitValidation(this.preRegisterForm)) {this.submit();}
  }

  submit(){
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.preRegister(this.preRegisterForm.value).subscribe(res => {
        
        Helpers.removeSpinner();
        this.goStep2();

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
