import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { validatePhone, CpfCnpj, ValidateDate, ValidateExpirationDate, Cpf } from '@clicca-webapp/shared/class/validator.method';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { getIPs } from '@clicca-webapp/shared/class/ip';
import { ContentServiceService } from '@clicca-webapp/shared/services/authenticator-service/content-service/content-service.service';

@Component({ preserveWhitespaces: false,
  selector: 'user-plans-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  private user = this.route.snapshot.data.user;

  public dataForm: FormGroup;
  public loaded = false;
  public term;
  public plan;
  public boxPayment: number = 1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private contentServiceService: ContentServiceService,
    private offerPlansService: OfferPlansService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    Helpers.applySpinner();
    this.contentServiceService.terms().toPromise().then(res => {
      this.term = res.body;
      return this.offerPlansService.show(this.route.snapshot.params.offer_plan_id).toPromise();
    }).then( res => {
      this.loaded = true;
      this.plan = res;
      this.createDataForm();
      this.getIp();
      Helpers.removeSpinner();
    });
  }

  getIp() {
    getIPs( (ip) => {
      this.dataForm.get('pre_approval').get('sender').get('ip').setValue(ip);
    });
  }

  createDataForm(): void {
    this.dataForm =  this.formBuilder.group({
      term: [ '', [Validators.required] ],
      subscription: this.formBuilder.group({
        offer_plan_id: [ this.route.snapshot.params.offer_plan_id ],
        user_id: [ User.fromCache().id ],
      }),
      pre_approval: this.formBuilder.group({
        sender: this.formBuilder.group({
          name: [ this.isCompany() ? this.user.profile.company_name : this.user.profile.first_name, [Validators.required] ],
          email: [ this.user.email, [Validators.required, Validators.email] ],
          telephone: [ this.user.phone, [Validators.required, validatePhone] ],
          ip: '',
          phone: this.formBuilder.group({
            area_code: [],
            number: [],
          }),
          document: this.formBuilder.group({
            type: [ this.isCompany() ? 'CNPJ' : 'CPF' ],
            value: [ this.isCompany() ? this.user.profile.cnpj : this.user.profile.cpf, [Validators.required, CpfCnpj] ]
          }),
          address: this.formBuilder.group({
            street: [ this.user.address ? this.user.address.line1 : '', [Validators.required] ],
            number: [ this.user.address ? this.user.address.number : '', [Validators.required] ],
            district: [ this.user.address ? this.user.address.district : '', [Validators.required] ],
            city: [ this.user.address ? this.user.address.city : '', [Validators.required] ],
            state: [ this.user.address ? this.user.address.state : '', [Validators.required] ],
            postal_code: [ this.user.address ? this.user.address.zip : '', [Validators.required] ],
          })
        }),
        payment_method: this.formBuilder.group({
          credit_card: this.formBuilder.group({
            token: [ '' ],
            holder: this.formBuilder.group({
              name: [ '', [Validators.required] ],
              birth_date: [ '', [Validators.required, ValidateDate] ],
              telephone: [ '', [Validators.required, validatePhone] ],
              card_number: [ '', [Validators.required, Validators.minLength(13), Validators.maxLength(19)] ],
              expiration_date: [ '', [Validators.required, ValidateExpirationDate] ],
              cvv: [ '', [Validators.required] ],
              document: this.formBuilder.group({
                type: [ 'CPF' ],
                value: [ '', [Validators.required, CpfCnpj] ],
              }),
              phone: this.formBuilder.group({
                area_code: [ '' ],
                number: [ '' ],
              }),
              address: this.formBuilder.group({
                street: [ '', [Validators.required] ],
                number: [ '', [Validators.required] ],
                district: [ '', [Validators.required] ],
                city: [ '', [Validators.required] ],
                state: [ '', [Validators.required] ],
                postal_code: [ '', [Validators.required] ],
              })
            })
          })
        })
      })
    });
  }

  isCompany() {
    return this.user.type === 'Company' ? true : false;
  }

  nextStep(id) {
    this.boxPayment = id;
  }

  reciverPage(event) {
    this.boxPayment = event;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
