import { Helpers } from "@clicca-webapp/shared/class/helpers";
import { Router } from '@angular/router';


export class Alert {

  constructor(private router:Router) {}
  
   static createElement(message, type, action?:any, actionData?:string) {
    if ( !document.querySelector('#alert') ) {
      let div = document.createElement("div");
      div.setAttribute("id", "alert");
      div.setAttribute("class", "alert");
      div.innerHTML = `
        <div class="alert-content">
          <img  rel=”preload” src="/assets/img/alert/${type}.svg" alt="">
          <h4>${ type === 'success' ? 'Sucesso!' : 'Infelizmente ocorreu um erro' }</h4>
          <p>${message}</p>
          <button class="btn btn-blue btn-md ${ type === 'success' ? 'btn-full' : 'btn-stroke' }" id="alert-button" type="click">Ok</button>
        </div>
      `;
      document.querySelector("body").appendChild(div);
      this.close(action,actionData);
    }
  }

  static error(message: string = '',type?:string , redirect?:string) {
   
    if(type && type === 'redirect'){
      this.createElement(message, 'error', 'redirect', redirect);

     
    } else{
      this.createElement(message, 'error');
    }

  }

    static success(message: string = '',type?:string , redirect?:string) {

    if(type && type === 'redirect'){
      this.createElement(message, 'success', 'redirect', redirect);
     
    } else{
      this.createElement(message, 'success');
    }
  }


  static close(action?:any,actionData?) {
    var button = document.querySelector("#alert-button");
    button.addEventListener("click", function () {
      Helpers.removeDisableForm();
      document.querySelector(".alert").remove();
      if (action && action ==='redirect'){
          // console.log('clicou aqui', actionData);
           setTimeout(function() {
            window.location.href = actionData;
        }, 1500);
    
    }
    });
  }

}
