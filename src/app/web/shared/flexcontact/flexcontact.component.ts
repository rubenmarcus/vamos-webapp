import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-flexcontact',
  templateUrl: './flexcontact.component.html',
  styleUrls: ['./flexcontact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlexcontactComponent implements OnInit {
  openContact;
  modal;
  constructor() { }

  ngOnInit() {
  }

  open(id) {
    const item = document.getElementById(id);
    switch (id) {
      case 'face':
       // ga('send', 'event', 'Clicks', 'Messenger');
      window.open('http://m.me/1750221175084845');
      break;
      case 'whats':
      window.open('https://api.whatsapp.com/send?phone=5511966309136&text=Ola!');
      break;
      case 'mail':
      window.open('mailto:contato@clicca.com.br');
      break;
      case 'fone':
      //this.modal = true;
      window.open('tel:+5511966309136');
      case 'chat':
      window.open('https://nwdsk.co/chat-form/cNjcy')
      break;
    }
}

openMenu() {
  this.openContact = !this.openContact;

}

  choosePhone() {
      //     swal({
      //     title: 'Escolha sua opção',
      // /*	  text: "You won't be able to revert this!",   */
      //     showCancelButton: true,
      //     cancelButtonColor: '#8c0051;',
      //     confirmButtonText: ' Ligue para nosso atendimento ',
      //     cancelButtonText: ' Deixe seu número, nós ligaremos ',
      //     confirmButtonClass: 'btn separado',
      //     cancelButtonClass: 'btn separado',
      //     buttonsStyling: false
      //   }).then(function () {
      //     window.location.assign("tel:+################");
      //   }, function (dismiss) {
      //     if (dismiss === 'cancel') {
      //     window.location.assign("http://#######################");
      //     }
      //   })
      }

}
