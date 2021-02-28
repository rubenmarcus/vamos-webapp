import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { validateCellphoneBR, Cpf, validatePhone , IsAdultAge, IsChild, validateEmail, ValidateDate} from '@clicca-webapp/shared/class/validator.method';
import { GetCepService } from '@clicca-webapp/shared/services/profile-service/get-cep.service';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

import { Routes, Router, ActivatedRoute } from '@angular/router';

import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';



@Component({ preserveWhitespaces: false,
  selector: 'app-add-dependent',
  templateUrl: './add-dependent.component.html',
  styleUrls: ['./add-dependent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDependentComponent implements OnInit, OnDestroy {

  public personForm: FormGroup;
  public maskCEP = InputMask.cepMask;
  public inputMask = InputMask;
  private subscriptions: Subscription[] = [];

  public owner;
  private user = User.fromCache();
  public dependents;
  public hasSpouse = false;
  isMarried = false;
  public messageError = MessageError;
  edit;
  dependentId;
  pageTitle;
  formloaded = false;

  public dep = this.activatedRoute.snapshot.data.dependent;


  public states = Enum.states;
  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private cepService: GetCepService,
    private activatedRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getCard();
    this.createFormUser();
  }



  getCard() {
    this.subscriptions.push(
      this.cardService.getOwner(this.user.id).subscribe(res => {
        this.owner = res[0].owner;
        this.dependents = this.filterDependent(res[0].dependents);
         if ( this.filterSpouse(this.dependents).length > 0) {
          this.hasSpouse = true;
          // console.log('Tem Esposa' , this.hasSpouse);
        } 
      }
     ));
  }

  filterDependent(dependents) {
    return dependents.filter(element => {
      return element.status === 'active';
    });
  }
  filterSpouse(spouse) {
    return spouse.filter(element => {
      return element.kinship === 'spouse';
    });
  }


  formatDate(input) {
    if (input) {
      const datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];
      return day + '/' + month + '/' + year;
    } else {
      return '';
    }
  }

  
  createFormUser() {
    const dependent = this.activatedRoute.snapshot.paramMap.get('id');
    if (dependent) {
      this.edit = true;
      this.pageTitle = 'Editar Dependente';
      const dep = this.dep[0];
       Helpers.applySpinner();
      this.personForm = this.formBuilder.group({
        kinship:  [ dep.kinship,  [Validators.required]],
        card_user: this.formBuilder.group({
          first_name: [dep.card_user.first_name ,  [Validators.required]],
          last_name: [ dep.card_user.last_name  ,  [Validators.required]],
          cpf: dep.card_user.cpf,
          gender:  [ dep.card_user.gender  ,  [Validators.required]],
          marital_status:  [  dep.card_user.marital_status  ,  [Validators.required]],
          cellphone: [dep.card_user.cellphone ,  [Validators.required, validateCellphoneBR]],
          phone: [dep.card_user.phone, [validatePhone]],
          email: [dep.card_user.email, [validateEmail, Validators.required]],
          rg:  [dep.card_user.rg ,  [Validators.required, Validators.maxLength(14)]],
          birthdate: [this.formatDate(dep.card_user.birthdate) , [Validators.required]] ,
          address_attributes: this.formBuilder.group({
            city: [dep.card_user.address.city ,  [Validators.required]],
            zip: [dep.card_user.address.zip  ,  [Validators.required]],
            complement: dep.card_user.address.complement,
            district: [dep.card_user.address.district ,  [Validators.required]],
            line1: [dep.card_user.address.line1  ,  [Validators.required]] ,
            number: [dep.card_user.address.number  ,  [Validators.required]],
            state: [dep.card_user.address.state  ,  [Validators.required]],
          }),
        })
      });

      Helpers.removeSpinner();
      this.formloaded = true;

    } else {
        this.pageTitle = 'Adicionar Dependente';
        this.edit = false;
        this.personForm = this.formBuilder.group({
          kinship:  [ '' ,  [Validators.required]],
          card_user: this.formBuilder.group({
            first_name: [ '' ,  [Validators.required]],
            last_name: [ '' ,  [Validators.required]],
            cpf: [ '' ,  [Validators.required , Cpf]],
            gender:  [ '' ,  [Validators.required]],
            marital_status:  [ '' ,  [Validators.required]],
            cellphone: [ '',  [Validators.required, validateCellphoneBR]],
            phone: ['', [validatePhone]],
            email: ['', [validateEmail, Validators.required]],
            rg:  ['' ,  [Validators.required, Validators.maxLength(14)]],
            birthdate: ['' , [Validators.required]] ,
            address_attributes: this.formBuilder.group({
              city: ['' ,  [Validators.required]],
              zip: ['' ,  [Validators.required]],
              complement: '',
              district: ['' ,  [Validators.required]],
              line1: ['' ,  [Validators.required]] ,
              number: ['' ,  [Validators.required]],
              state: ['' ,  [Validators.required]],
            }),
          })
        });



      this.formloaded = true;
    } 
  }

  getLength(){
    Helpers.getLength(this.personForm.get('card_user').get('first_name').value , this.personForm.get('card_user').get('last_name').value);
  }


  checkKinship() {
      const kinshipval = this.personForm.get('kinship').value;
      if ( kinshipval === 'child') {
        this.personForm.get('card_user').get('birthdate').clearValidators();
        this.personForm.get('card_user').get('birthdate').setValidators([IsChild]);
      } else if ( kinshipval === 'spouse') {
        this.isMarried = true;
        this.personForm.get('card_user').get('birthdate').clearValidators();
        this.personForm.get('card_user').get('birthdate').setValidators([ValidateDate]);
      }
  }

clearField() {
    this.personForm.get('card_user').get('birthdate').setValue('');
    const kinshipval = this.personForm.get('kinship').value;
    if ( kinshipval === 'child') {
      this.isMarried = false;
      this.personForm.get('card_user').get('marital_status').setValue('');
    } else if ( kinshipval === 'spouse') {
       this.isMarried = true;
       this.personForm.get('card_user').get('marital_status').setValue('married');
       }
  }



  isFieldValid(field: string, attr = null ) {
    if(attr != null) {
       return !this.personForm.get('card_user').get(attr).get(field).valid && this.personForm.get('card_user').get(attr).get(field).touched;
      } else{
        return !this.personForm.get('card_user').get(field).valid && this.personForm.get('card_user').get(field).touched;
      }
  }


  submitForm() {
    if (ValidateForm.submitValidation(this.personForm)) {this.submit();}
  }


  submit() {
    if (!this.edit) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.createDependent(this.owner.account_id , this.personForm.value).subscribe(res => {
        Alert.success('Dependente Adicionado com Sucesso.');
        Helpers.removeSpinner();
        this.router.navigateByUrl('/cartao/meus-dependentes');
      },
        error => {
          Alert.error(error.error.message);
          Helpers.removeSpinner();
        }
     ));
   } else {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.cardService.updateOwner(this.personForm.value, this.owner.account_id , this.dep[0].card_user.id).subscribe(res => {
        Alert.success('Dependente Atualizado com Sucesso.');
        Helpers.removeSpinner();
        this.router.navigateByUrl('/cartao/meus-dependentes');
      },
        error => {
          Alert.error(error.error.message);
          Helpers.removeSpinner();
        }
     ));


   }
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }


}
