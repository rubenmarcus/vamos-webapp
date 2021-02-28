
export const InputMask = {
  phoneMask: { mask: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ], guide: false },
  cellMask: { mask: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ], guide: false },
  cpfMask : { mask: [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.' , /\d/, /\d/, /\d/, '-' , /\d/, /\d/ ], guide: false },
  birthdayMask : { mask: [/[0-9]/, /[0-9]/, '/' , /[0-9]/, /[0-9]/, '/' , /\d/, /\d/, /\d/, /\d/ ], guide: false },
  cnpjMask: { mask: [ /\d/, /\d/, '.' , /\d/, /\d/, /\d/, '.' , /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/,/\d/, '-' , /\d/, /\d/ ], guide: false },
  cepMask: { mask: [ /\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/ ], guide: false },
  expirationDateMask: { mask: [ /\d/, /\d/, '/' , /\d/, /\d/, /\d/, /\d/ ], guide: false },
  cvvMask: { mask: [ /\d/, /\d/, /\d/, /\d/ ], guide: false },
  yearMask: { mask: [ /\d/, /\d/, /\d/, /\d/ ], guide: false },
  offersMask: { mask: [ /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/ ], guide: false },
  plateMask: { mask: [ /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, /\d/, /\d/, /\d/, /\d/ ], guide: false },
  cardNumberMask: { mask: [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/ ], guide: false },
  number: { prefix: '', thousands: '.', decimal: ',', align: 'left', precision: 0, allowZero: true, allowNegative: false, },
  priceMask: { prefix: '', thousands: '.', decimal: ',', align: 'left', precision: 2, allowZero: true, allowNegative: false  },
  codeMask: { mask: [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/ ], guide: false },
}
