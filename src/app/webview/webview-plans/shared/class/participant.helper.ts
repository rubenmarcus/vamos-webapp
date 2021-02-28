export class ParticipantHelper {

  static isSenderPayment(): boolean {
    const obj = JSON.parse(sessionStorage.getItem('payment'));
    return obj.hasOwnProperty("pre_approval") ? true : false;
  }

  static isCompany(type): boolean {
    return type === "Company" ? true : false;
  }

  static isPerson(type): boolean {
    return type === "Person" ? true : false;
  }

  static getAddress(user) {
    if (user.address) {
      return {
        street: user.address.line1,
        number: user.address.number,
        district: user.address.district,
        city: user.address.city,
        state: user.address.state,
        postal_code: user.address.zip,
      }
    } else {
      return {
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        postal_code: '',
      }
    }
  }

  static getSubscription() {
    return JSON.parse(sessionStorage.getItem('payment')).subscription;
  }

  static getParticipant(user) {
    if (ParticipantHelper.isSenderPayment()) {
      return JSON.parse(sessionStorage.getItem('payment'));
    } else {
      return ParticipantHelper.createObject(user);
    }
  }

  static createObject(user) {
    return {
      subscription: ParticipantHelper.getSubscription(),
      billingAddress: '',
      pre_approval: {
        sender: {
          name: ParticipantHelper.isPerson(user.type) ? user.profile.first_name : user.profile.company_name,
          email: user.email,
          telephone: user.phone,
          ip: '',
          phone: {
            area_code: user.phone.replace(/[^\d]+/g, '').substring(0, 2),
            number: user.phone.replace(/[^\d]+/g, '').substring(2),
          },
          document: {
            type: ParticipantHelper.isPerson(user.type) ? 'CPF' : 'CNPJ',
            value: ParticipantHelper.isPerson(user.type) ? user.profile.cpf : user.profile.cnpj
          },
          address: ParticipantHelper.getAddress(user)
        },
        payment_method: {
          credit_card: {
            token: '',
            holder: {
              name: '',
              birth_date: '',
              telephone: '',
              card_number: '',
              expiration_date: '',
              cvv: '',
              document: {
                type: 'CPF',
                value: '',
              },
              phone: {
                area_code: '',
                number: '',
              },

              address: {
                street: '',
                number: '',
                district: '',
                city: '',
                state: '',
                postal_code: '',
              }
            }
          }
        }
      }
    };
  }

  static savePaymentUser(obj) {
    sessionStorage.setItem('payment_user', JSON.stringify(obj));
  }

  static getPaymentUser() {
    return JSON.parse(sessionStorage.getItem('payment_user'));
  }

}
