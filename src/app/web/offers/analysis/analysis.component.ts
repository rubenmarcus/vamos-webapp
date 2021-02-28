import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { FinanceService } from '@clicca-webapp/shared/services/vehicle-selling/finance-service/finance.service';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

import { Cpf, validatePhone, IsAdultAge, validateCellphoneBR, noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'offer-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalysisComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public analysisForm: FormGroup;
  public inputMask = InputMask;
  public maskPhone = InputMask.phoneMask;
  public messageError = MessageError;
  public modal;
  public modalMsg;
  public isOpen: boolean = false;
  public validateForm = ValidateForm;

  constructor(
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('finance') !== null) {
      this.loadInfo();
    } else {
      this.router.navigateByUrl('/classificados/simular-financiamento');
    }
  }

  loadInfo() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.profileService.info(User.fromCache().id).subscribe(res => {
        if (res.type === 'Person') {
          this.createForm(res);
          this.changeMask(res.second_phone);
        } else {
          this.createForm(null);
        }
      })
    );
  }

  createForm(res) {
    this.isOpen = true;
    const financeData =  JSON.parse(sessionStorage.getItem('finance'));
    Helpers.removeSpinner();
    this.analysisForm = this.formBuilder.group({
      type: 'person',
      simulation: this.formBuilder.group({
        value: financeData.vehicle_value,
        parcels: financeData.parcels,
        parcel_value: financeData.parcel_value,
        entrance: financeData.entry,
        name: [ res ? res.profile.first_name + ' ' + res.profile.last_name : '' , [ Validators.required ] ],
        cpf: [ res ? res.profile.cpf : '', [ Validators.required, Cpf ] ],
        birth_date: [ res ? Helpers.birthDate(res.profile.birth_date) : '', [ Validators.required, IsAdultAge] ],
        gender: ['', [ Validators.required , noEmoji] ],
        mother_name: ['', [ Validators.required, Validators.pattern('[A-Za-zÀ-ú, ]+') ] ],
        inputPhone: [res ? res.second_phone : '', [ Validators.required, validatePhone ] ],
        inputCell: [res ? res.phone : '' , [ Validators.required, validateCellphoneBR] ],
        area_code: ['',[noEmoji]],
        phone: ['',[noEmoji]],
        cel_area_code: ['',[noEmoji]],
        cel_phone:['',[noEmoji]],
        income: ['', [ Validators.required, noEmoji] ],
      })
    });
    this.analysisForm.get('simulation').get('name').setValidators([noEmoji]);
    this.analysisForm.get('simulation').get('mother_name').setValidators([noEmoji]);
  }

  changeMask(value) {
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(value)){
      this.maskPhone = InputMask.cellMask;
    }else{
      this.maskPhone = InputMask.phoneMask;
    }
  }

  getForm() {
    let object = JSON.parse(JSON.stringify( this.analysisForm.value ));

    object.simulation.cpf =  Helpers.onlyNumber(object.simulation.cpf);

    object.simulation.area_code = Helpers.getDdd(object.simulation.inputPhone);
    object.simulation.phone = Helpers.getPhone(object.simulation.inputPhone);

    object.simulation.cel_area_code = Helpers.getDdd(object.simulation.inputCell);
    object.simulation.cel_phone = Helpers.getPhone(object.simulation.inputCell);

    object.simulation.birth_date = Helpers.unformatDate(object.simulation.birth_date);

    delete object.simulation.inputPhone;
    delete object.simulation.inputCell;

    return object;
  }

  submitForm() {
    if (this.analysisForm.valid) {
      Helpers.applySpinner();
      this.subscriptions.push(
        this.financeService.simulation(this.getForm()).subscribe(res => {
          const returnCode = res.return_code;
          this.modalMsg = res.message;
          this.modal = true;
          sessionStorage.removeItem('finance');
          Helpers.removeSpinner();
        })
      );
    } else {
      this.validateForm.validateAllFormFields(this.analysisForm);
    }
  }

  isFieldValid(attr, field: string) {
    return !this.analysisForm.get('simulation').get(field).valid && this.analysisForm.get('simulation').get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
