import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { validateFinance, noEmoji } from '@clicca-webapp/shared/class/validator.method';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { FinanceService } from '@clicca-webapp/shared/services/vehicle-selling/finance-service/finance.service';


@Component({ preserveWhitespaces: false,
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinanceComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  public financeForm: FormGroup;
  public session: boolean;
  public value_entry;
  public value_vehicle;
  public value_selected;
  public value_finance;
  public value_parcel;

  public entry_error = false;
  public result = false;
  public parcel;
  public parcels = [];
  public tax;

  public messageError = MessageError;

  constructor(
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private offersService: OffersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.createForm('');
    if ( this.route.snapshot.paramMap.get('id')) {
      Helpers.applySpinner();
      this.getOffer();
    }
    this.getTax();
  }

  getOffer() {
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.show(id).subscribe(res => {
        const offerValue = res.value;
        this.createForm(offerValue);
        Helpers.removeSpinner();
      })
    );
  }

  getTax() {
    this.subscriptions.push(
      this.financeService.tax().subscribe(res => {
        this.parcels = res.parcels.sort().reverse();
        this.tax = res.tax_value / 100;
      })
    );
  }

  createForm(info): void {
    const finance = JSON.parse(sessionStorage.getItem('finance'));
    const value = finance ? finance.vehicle_value : info;
    const twenty_of = value  * 20 / 100;

    this.financeForm = this.formBuilder.group({
      vehicle_value: [value, [Validators.required]],
      parcels: [finance ? finance.parcels : '', [Validators.required]],
      entry: [finance ? finance.entry : twenty_of, [Validators.required]],
      parcel_value: ''
    }, {
      validator: validateFinance
    });
    this.financeForm.controls['vehicle_value'].setValidators([noEmoji]);
    this.financeForm.controls['entry'].setValidators([noEmoji]);
  }

  twoDecimal(myNumber) {
    const double = (Math.round(myNumber * 100) / 100).toFixed(2);
    return Number(double);
  }

  parcelsCalc(parcelV) {
    const value_finance = this.financeForm.value.vehicle_value - this.financeForm.value.entry;
    const vFinance = this.twoDecimal(this.value_finance);
    const calcPow = Math.pow( 1 / ( 1 +  this.tax ), this.twoDecimal(parcelV));
    const value_total = ( vFinance * this.tax ) / ( 1 - ( calcPow ));
    const value_final = this.twoDecimal(value_total);

    return value_final;
  }

  showResult() {
    this.result = true;
    this.value_vehicle = this.financeForm.value.vehicle_value;
    this.value_entry = this.financeForm.value.entry;
    this.value_parcel = this.financeForm.value.parcels;
    this.value_finance = this.financeForm.value.vehicle_value - this.financeForm.value.entry;

    this.parcelsCalc(this.value_parcel);
    this.financeForm.value.parcel_value = this.parcelsCalc(this.value_parcel);
  }

  goStepOne() {
    this.result = false;
  }

  goAnalysis() {
    sessionStorage.setItem('finance', JSON.stringify(this.financeForm.value));
    if ( new SessionChecker().isSessionStarted ) {
      this.router.navigateByUrl('/classificados/analise-credito');
    } else {
      this.router.navigateByUrl('/account/login');
    }
  }

  isFieldValid(field: string) {
    return !this.financeForm.get(field).valid && this.financeForm.get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
