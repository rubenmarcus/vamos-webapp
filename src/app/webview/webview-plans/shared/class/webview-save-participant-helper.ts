import { Helpers } from "@clicca-webapp/shared/class/helpers";
import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";

export class WebviewSaveParticipantHelper {

  static save(object, user) {
    sessionStorage.setItem('payment', JSON.stringify( object ));
  }

  static createObject(object, user) {
    if (object.pre_approval.hasOwnProperty("payment_method") && object.pre_approval.payment_method.credit_card.holder.address.postal_code) {
      const payment = ParticipantHelper.getParticipant(user);
      payment['pre_approval']['payment_method'] = object.pre_approval.payment_method;

      if(object.pre_approval.sender.address.postal_code && user.address) {
        payment.pre_approval.sender['address'] = object.pre_approval.sender.address;
      }else{
        payment.pre_approval.sender['address'] = object.pre_approval.payment_method.credit_card.holder.address;
      }
      return payment;
    } else {
      return object;
    }
  }

  static send(object) {
    var clone = JSON.parse(JSON.stringify( WebviewSaveParticipantHelper.setPhoneCard(object) ));

    delete clone.term
    delete clone.billingAddress
    delete clone.pre_approval.sender.telephone
    delete clone.pre_approval.payment_method.credit_card.holder.telephone
    delete clone.pre_approval.payment_method.credit_card.holder.card_number
    delete clone.pre_approval.payment_method.credit_card.holder.expiration_date
    delete clone.pre_approval.payment_method.credit_card.holder.cvv
    return clone;
  }

  static setPhoneCard(object) {
    const phoneSender = object.pre_approval.sender.telephone.replace(/[^\d]+/g, '');
    object.pre_approval.sender.phone.area_code = phoneSender.substring(0, 2);
    object.pre_approval.sender.phone.number = phoneSender.substring(2);

    const phoneCard = object.pre_approval.payment_method.credit_card.holder.telephone.replace(/[^\d]+/g, '');
    object.pre_approval.payment_method.credit_card.holder.phone.area_code = phoneCard.substring(0, 2);
    object.pre_approval.payment_method.credit_card.holder.phone.number = phoneCard.substring(2);


    const documentSender = object.pre_approval.sender.document.value.replace(/[^\d]+/g, '');
    object.pre_approval.sender.document.value = documentSender;

    const documentCard = object.pre_approval.payment_method.credit_card.holder.document.value.replace(/[^\d]+/g, '');
    object.pre_approval.payment_method.credit_card.holder.document.value = documentCard;


    const zip = object.pre_approval.payment_method.credit_card.holder.address.postal_code.replace(/[^\d]+/g, '');
    object.pre_approval.payment_method.credit_card.holder.address.postal_code = zip;


    object.pre_approval.sender.address.postal_code = object.pre_approval.sender.address.postal_code.replace(/[^\d]+/g, '');

    return object;
  }

}
