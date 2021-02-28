import { NgModule } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";
import { validatePhone, CpfCnpj, ValidateDate, ValidateExpirationDate, Cpf } from "@clicca-webapp/shared/class/validator.method";

@NgModule()
export class WebviewFormBuilderModule {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  getPaymentMethod(profile) {
    const object = ParticipantHelper.getParticipant(profile);

    return this.formBuilder.group({
      term: [ true ],
      billingAddress: [ object.billingAddress ],
      subscription: this.formBuilder.group({
        offer_plan_id: [ object.subscription.offer_plan_id ],
        user_id: [ object.subscription.user_id ],
      }),
      pre_approval: this.formBuilder.group({
        sender: this.formBuilder.group({
          name: [ object.pre_approval.sender.name ],
          email: [ object.pre_approval.sender.email ],
          telephone: [ object.pre_approval.sender.telephone ],
          // ip: "170.64.238.152",
          ip: object.pre_approval.sender.ip,
          phone: this.formBuilder.group({
            area_code: [],
            number: [],
          }),
          document: this.formBuilder.group({
            type: [ object.pre_approval.sender.document.type ],
            value: [ object.pre_approval.sender.document.value ]
          }),
          address: this.formBuilder.group({
            street: [ object.pre_approval.sender.address.street ],
            number: [ object.pre_approval.sender.address.number ],
            district: [ object.pre_approval.sender.address.district ],
            city: [ object.pre_approval.sender.address.city ],
            state: [ object.pre_approval.sender.address.state ],
            postal_code: [ object.pre_approval.sender.address.postal_code ],
          })
        }),
        payment_method: this.formBuilder.group({
          credit_card: this.formBuilder.group({
            token: [ object.pre_approval.payment_method.credit_card.token ],
            holder: this.formBuilder.group({
              name: [ object.pre_approval.payment_method.credit_card.holder.name],
              birth_date: [ object.pre_approval.payment_method.credit_card.holder.birth_date ],
              telephone: [ object.pre_approval.payment_method.credit_card.holder.telephone ],
              card_number: [ object.pre_approval.payment_method.credit_card.holder.card_number ],
              expiration_date: [ object.pre_approval.payment_method.credit_card.holder.expiration_date ],
              cvv: [ object.pre_approval.payment_method.credit_card.holder.cvv ],
              document: this.formBuilder.group({
                type: [ object.pre_approval.payment_method.credit_card.holder.document.type ],
                value: [ object.pre_approval.payment_method.credit_card.holder.document.value ],
              }),
              phone: this.formBuilder.group({
                area_code: [ object.pre_approval.payment_method.credit_card.holder.phone.area_code ],
                number: [ object.pre_approval.payment_method.credit_card.holder.phone.number ],
              }),
              address: this.formBuilder.group({
                street: [ object.pre_approval.payment_method.credit_card.holder.address.street ],
                number: [ object.pre_approval.payment_method.credit_card.holder.address.number ],
                district: [ object.pre_approval.payment_method.credit_card.holder.address.district ],
                city: [ object.pre_approval.payment_method.credit_card.holder.address.city ],
                state: [ object.pre_approval.payment_method.credit_card.holder.address.state ],
                postal_code: [ object.pre_approval.payment_method.credit_card.holder.address.postal_code ],
              })
            })
          })
        })
      })
    });
  }

}
