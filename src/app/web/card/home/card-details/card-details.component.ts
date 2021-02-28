import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';


@Component({ preserveWhitespaces: false,
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDetailsComponent implements OnInit {
  @Input() UserData;
  @Input() isDependent;
  @Input() dependentId;

  public inputMask = InputMask;
  noPhone;
  constructor() { }

  ngOnInit() {
     // console.log(this.UserData);
    if(!this.UserData.phone  || !this.UserData.cellphone ){
      this.UserData.phone = '';
      this.UserData.cellphone = '';
      this.noPhone = true;
    } else {  this.noPhone = false;  }
  //  console.log('User Data', this.UserData);
  }

 mCPF(cpf) {
    cpf = cpf.replace(/\D/g,"")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf;
  }
  mRG(rg){
    rg=rg.replace(/[^\dX]/g,"")
    rg=rg.replace(/(\d{2})(\d)/,"$1.$2")
    rg=rg.replace(/(\d{3})(\d)/,"$1.$2")
    rg=rg.replace(/(\d{3})([\dX]{1,2})$/,"$1-$2")
    return rg;
  }
  mCEP(cep){
    cep=cep.replace(/\D/g,"")
    cep=cep.replace(/^(\d{2})(\d)/,"$1.$2")
    cep=cep.replace(/(\d{3})(\d)/,"$1-$2")
    return cep
  }
  mTel(tel) {
    tel=tel.replace(/\D/g,"")
    tel=tel.replace(/^(\d)/,"($1")
    tel=tel.replace(/(.{3})(\d)/,"$1)$2")
    if(tel.length == 9) {
      tel=tel.replace(/(.{1})$/,"-$1")
    } else if (tel.length == 10) {
      tel=tel.replace(/(.{2})$/,"-$1")
    } else if (tel.length == 11) {
      tel=tel.replace(/(.{3})$/,"-$1")
    } else if (tel.length == 12) {
      tel=tel.replace(/(.{4})$/,"-$1")
    } else if (tel.length > 12) {
      tel=tel.replace(/(.{4})$/,"-$1")
    }
    return tel;
  }



}
