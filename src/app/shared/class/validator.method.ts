import { AbstractControl, FormControl, Validators, FormGroup } from '@angular/forms';

export class Validate{
  static plate(control: AbstractControl){
    const regex = /^[a-zA-Z]{3}\d{4}$/;
    if (regex.test(control.value) || control.value === null || control.value === undefined || control.value === "") {
      return null;
    } else {
      return {
        error: true
      };
    }
  }
  static year(control: AbstractControl){
    const regex = /^[0-9]{4}$/;
    const date = new Date().getFullYear() + 1;

    if ( control.value === null || control.value === undefined || control.value === "" || (regex.test(control.value) && !(control.value > date || control.value < 1900)) ) {
      return null;
    } else {
      return {
        error: true
      };
    }
  }
}

export function noEmoji(control: AbstractControl){

      let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;    
   
      if(isFinite(control.value)) {
        // Is Number
        const itemVal = control.value.toString();
        if(itemVal.match(regex)){
                control.setValue('');
                return { error: true };
              }

      } else {
        const itemVal = control.value;
        if(itemVal.match(regex)){
          control.setValue('');
          return { error: true };
         }
      }
     
  }



export function Cnpj(control: AbstractControl) {
  const value = control.value.replace(/[^\d]+/g, '');
  if (validateCnpj(value)) {
    return null;
  } else {
    return { validCnpj: true };
  }
}

export function Cpf(control: AbstractControl) {
  const value = control.value.replace(/[^\d]+/g, '');
  if (validateCpf(value)) {
    return null;
  } else {
    return { validCpf: true };
  }
}

export function CpfCnpj(control: AbstractControl) {
  const value = control.value.replace(/[^\d]+/g, '');
  if ((validateCnpj(value) && value.length === 14) || (validateCpf(value) && value.length === 11)) {
    return null;
  } else {
    return { validUrl: true };
  }
}

export function ValidateUrl(control: AbstractControl) {

  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { validUrl: true };
  }
  return null;
}

export function IsAdultAge(control: AbstractControl) {
  if (checkingAge(control.value)) {
    return null;
  }
  return { validUrl: true };
}
export function IsChild(control: AbstractControl) {
  if (isChild(control.value)) {
    return null;
  }
  return { validUrl: true };
}


export function compareEmail(group: FormGroup) {
  const input = group.value;
  return (input.email === input.repeatEmail) ? null : {
    invalid: true
  };
}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
     let password = AC.get('password').value; // to get value in input tag
     let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag

      if(password != confirmPassword  ) {
         //console.log('false');
          AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
         // console.log('true');
          return null
      }
  }
}

export function ValidateExpirationDate(control: AbstractControl) {
  if (/^\d{1,2}\/\d{4}$/.test(control.value) && isExpirationDate(`${control.value}`)) {
    return null;
  } else {
    return { error: true };
  }
}

export function ValidateDate(control: AbstractControl) {
  if (checkDate(control.value) && isCheckDateMax(control.value)) {
    return null;
  } else {
    return { error: true };
  }
}

export const compareDate = (control: AbstractControl) => {
  const dateInitial = control.get('startDate').value;
  const dateEnd = control.get('endDate').value;

  if ((dateInitial <= dateEnd)) {
    return null;
  } else {
    return { validDate: true };
  }

};

export const validateFinance = (control: AbstractControl) => {
  const vehicleValue = control.get('vehicle_value').value;
  const entry = control.get('entry').value;
  const twenty_of = vehicleValue  * 20 / 100;

  if ( entry < twenty_of || entry > vehicleValue ) {
    return { validateFinance: true };
  } else {
    return null;
  }
};

export const validateCellphoneBR = (control) => {
  const regex = /^[1-9]{2}9[0-9]{4}[0-9]{4}$/;
  control.value = control.value.replace(/[^\d]+/g, '');
  if (regex.test(control.value) || control.value === null || control.value === undefined || control.value === "") {
    return null;
  } else {
    return {
      validCellphone: true
    };
  }
};

export const validatePhone = (control) => {
  const regex = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/;
  const regexPhone = /^\(?\d{2}\)?[\s-]\d{4}-?\d{4}$/;
  control.value = control.value.replace(/_/g,'');
  if(regex.test(control.value) || regexPhone.test(control.value) || control.value === null || control.value === undefined || control.value === ""){
    return null;
  }else{
    return { error: true };
  }
};

export const validateEmail = (control: AbstractControl) => {
  // tslint:disable-next-line:max-line-length
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(control.value) || control.value === null || control.value === undefined || control.value === "") {
    return null;
  } else {
    return {
      error: true
    };
  }
};

function validateCnpj(str) {
  str = str.replace('.', '');
  str = str.replace('.', '');
  str = str.replace('.', '');
  str = str.replace('-', '');
  str = str.replace('/', '');
  var cnpj = str;
  var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
  digitos_iguais = 1;
  if (cnpj.length < 14 && cnpj.length < 15)
    return false;
  for (i = 0; i < cnpj.length - 1; i++)
    if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;
    return true;
  }
  else
    return false;
}

function validateCpf(value): boolean {
  let add, rev, i;
  // tslint:disable-next-line:max-line-length
  const invalidos = ['11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999', '00000000000'];
  if (invalidos.indexOf(value) > -1) {
    return false;
  }

  // validando primeiro digito
  add = 0;
  for (i = 0; i < 9; i++) {
    add += parseInt(value.charAt(i), 10) * (10 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(value.charAt(9), 10)) {
    return false;
  }

  // validando segundo digito
  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(value.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(value.charAt(10), 10)) {
    return false;
  }
  return true;
}

function checkDate(value) {
  // tslint:disable-next-line:max-line-length
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value);
}

const isCheckDateMax = (value) => {
  if (value) {
    const dateSelect = convertDate(value);
    const dateCurrent: Date = new Date();
    return dateCurrent >= dateSelect;
  }
};

const convertDate = (value) => {
  const dateSplit = value.split('/');
  const day = dateSplit[0];
  const month = dateSplit[1] - 1;
  const year = dateSplit[2];

  const date = new Date(year, month, day);

  return date;
};


const isExpirationDate = (value) => {
  const dateCurrent: Date = new Date();
  dateCurrent.setHours(0,0,0,0);

  const dateSplit = value.split('/');
  const month = dateSplit[0] - 1;
  const year = dateSplit[1];
  const date = new Date(year, month, dateCurrent.getDate(), 0, 0, 0, 0);
  return dateCurrent <= date;
};

function checkingAge(birthday) {
  if (checkDate(birthday)) {

    const date = new Date;

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    birthday = birthday.split('/');

    const yearBirth = birthday[2];
    const monthBirth = birthday[1];
    const dayBirth = birthday[0];

    let old = currentYear - yearBirth;

    const dateLimit = new Date(1920, 0, 1);
    const dateCurrent = new Date(yearBirth, monthBirth - 1, dayBirth);

    if (currentMonth < monthBirth || currentMonth === monthBirth && currentDay < dayBirth) {
      old--;
    }

    if (old >= 18 && dateLimit <= dateCurrent) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isChild(birthday) {
  if (checkDate(birthday)) {

    const date = new Date;

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    birthday = birthday.split('/');

    const yearBirth = birthday[2];
    const monthBirth = birthday[1];
    const dayBirth = birthday[0];

    let old = currentYear - yearBirth;

    const dateLimit = new Date(1920, 0, 1);
    const dateCurrent = new Date(yearBirth, monthBirth - 1, dayBirth);

    if (currentMonth < monthBirth || currentMonth === monthBirth && currentDay < dayBirth) {
      old--;
    }

    if (old <= 21 && dateLimit <= dateCurrent && yearBirth <= currentYear) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
