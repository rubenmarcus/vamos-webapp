import { Alert } from '@clicca-webapp/shared/class/alert';

export class Helpers {

  constructor(  ) { }

  static applySpinner() {
    Helpers.applyDisabledForm();
    let a = document.querySelector(`.spinner`);
    a.classList ? a.classList.add('show') : a.className += ' show';
  }

  static getLength(first, last) {
    const userName = first + last;
    if (userName.length > 20 || userName.length < 6) {
      Alert.error('Por favor, digite novamente seu nome ou sobrenome. Excedeu o limite. Deve conter no mínimo 6 caracteres e no máximo 20 caracteres.');
    }
  }
  static logOut(){
      localStorage.clear();
      sessionStorage.clear();
  }

  static removeSpinner() {
    Helpers.removeDisableForm();
    let element = document.querySelector(`.spinner`);
    element.classList.remove("show");
  }

  static applyDisabledForm() {
    const buttons: any = document.querySelectorAll(`fieldset`);
    const size = buttons.length;
    for (let i = 0; i < size; i++) {
      buttons[i].setAttribute('disabled', 'false');
    }
  }

  static removeDisableForm() {
    const buttons: any = document.getElementsByTagName('fieldset');
    const size = buttons.length;
    for (let i = 0; i < size; i++) {
      buttons[i].removeAttribute('disabled');
      buttons[i].classList.remove('disabled');
    }
  }

  static applyDisabledButton(event): void {
    // para usar esse método é obrigatório que todos os buttons
    // da página tenham um id
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;

    // const buttonSelect: any = document.getElementById(value);
    const buttonSelect: any = document.querySelector(`button#${value}`);
    const ifDisabled = buttonSelect.getAttribute('disabled');
    buttonSelect.setAttribute('disabled', 'false');
    buttonSelect.classList.add('disabled');
  }

  static removeDisableButton() {
    const buttons: any = document.getElementsByTagName('button');
    const size = buttons.length;
    for (let i = 0; i < size; i++) {
      buttons[i].removeAttribute('disabled');
      buttons[i].classList.remove('disabled');
    }
  }

  static datePeriod() {
    const end = new Date().getFullYear() + 1;
    const start = 1950;
    const length = (end - start) + 1;
    return Array(length).fill(0).map(function(_, index) {
      return start + index;
    }).reverse();
  }

  static removeEmptyValues(obj) {
    for (var propName in obj) {
      if (!obj[propName] || obj[propName].length === 0) {
        delete obj[propName];
      } else if (typeof obj === 'object') {
        this.removeEmptyValues(obj[propName]);
      }
    }
    return obj;
  }


  static dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  static encodeURIComponent(params) {
    return Object.keys(params).map(function(key) {
      if( Array.isArray(params[key]) ) {
        return params[key].map(element => {
          return `${key}[]=${element}`;
        }).join('&');
      }else{
        return `${key}=${params[key]}`;
      }
    }).join('&');
  }

  static unformatDate(input) {
    const datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
    return day+'-'+month+'-'+year;
  }

  static onlyNumber(value) {
    return value.replace(/[^\d]+/g, '');
  }

  static getDdd(value) {
    return Helpers.onlyNumber(value).substring(0, 2);
  }

  static getPhone(value) {
    return Helpers.onlyNumber(value).substring(2);
  }

  static birthDate(value) {
    if ( value ) {
      value = value.split('-');
      return `${value[2]}/${value[1]}/${value[0]}`;
    }
  }

  static dateEuaToBr(value) {
    const date = new Date(value);
    const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;

    const month = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static stringToNumber(value) {
    return parseFloat(value.replace(/,/, "."));
  }

  static isEmpty(obj) {
      return Object.keys(obj).length === 0;
  }
}
