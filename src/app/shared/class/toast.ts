export class Toast {

  static createElement(message, type){
    let div = document.createElement("div");
    div.setAttribute("id", "toast-container");
    div.setAttribute("class", "toast-bottom-center");
    div.innerHTML = `
      <div class="toast toast-${type}" aria- live="assertive" style= "display: block;">
        <div class="toast-message"> ${message} </div>
      </div>
    `;
    document.querySelector("body").appendChild(div);
    this.close();
    this.timeOut();
  }

  static error(message) {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="dialog-error">
        <div class="dialog-error-content">
          <img  rel=”preload” src="/assets/img/error/internal-server-error.png" alt="">
          <h4>Infelizmente ocorreu um erro</h4>
          <p>${message}</p>
          <button class="btn big grey" id="dialog-error-button" type="click">Ok</button>
        </div>
      </div>
    `;
    document.querySelector("body").appendChild(div);
    this.closeModal();
  }

  static success(message) {
    this.createElement(message, 'success');
  }

  static close(){
    var button = document.querySelector("#toast-container");
    button.addEventListener("click", function () {
      document.querySelector("#toast-container").remove();
    });
  }

  static closeModal(){
    var button = document.querySelector("#dialog-error-button");
    button.addEventListener("click", function () {
      document.querySelector(".dialog-error").remove();
    });
  }

  static timeOut(){
    setTimeout(() => {
      document.querySelector("#toast-container").remove();
    }, 5000);
  }

}
