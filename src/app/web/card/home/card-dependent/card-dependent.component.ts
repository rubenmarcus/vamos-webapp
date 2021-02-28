import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({ preserveWhitespaces: false,
  selector: 'app-card-dependent',
  templateUrl: './card-dependent.component.html',
  styleUrls: ['./card-dependent.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDependentComponent implements OnInit {

  @Input() DependentData;
  public dependents;
  cardBg = false;
  loaded = false;
  dependentEdit;
  constructor() { }

  ngOnInit() {
    this.setDependent();

  }

  setDependent() {

    this.dependents = this.DependentData;

      if(!this.dependents.number) {
        this.dependents.number = ' 0000000000000000';
      }
      this.loaded = true;

  }

  mcc(v){
    v = v.replace(/\D/g,""); // Permite apenas dígitos
    v = v.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'') // Coloca um ponto a cada 4 caracteres
    v = v.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
    v = v.substring(0, 19)// Limita o tamanho
  
    return v;
  }
  openConsultas(){
    window.open('https://temadmcartoes.zendesk.com/hc/pt-br/requests/new','_blank');
  }
  clickCard() {
    if( !this.cardBg) {
      this.cardBg = true; 
    } else {
      this.cardBg = false;
    }
  }
}
