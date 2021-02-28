export class WebviewHelpers {

  constructor() { }

  static applySpinner() {
    let a = document.querySelector(`.webview-spinner`);
    a.classList ? a.classList.add('show') : a.className += ' show';
  }

  static removeSpinner() {
    let element = document.querySelector(`.webview-spinner`);
    element.classList.remove("show");
  }

}
