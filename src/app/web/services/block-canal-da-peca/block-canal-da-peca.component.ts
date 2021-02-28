import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CanalDaPecaService } from '@clicca-webapp/shared/services/canal-da-peca/canal-da-peca.service';
import { Subscription } from 'rxjs/Rx';
import { Helpers } from '@clicca-webapp/shared/class/helpers';


@Component({ preserveWhitespaces: false,
  selector: 'services-block-canal-da-peca',
  templateUrl: './block-canal-da-peca.component.html',
  styleUrls: ['./block-canal-da-peca.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlockCanalDaPecaComponent implements OnInit, OnDestroy {
  cdp = [];
  private subscriptions: Subscription[] = [];
  constructor(private CDPService: CanalDaPecaService) { }

  ngOnInit() {
    this.get();
  }
  redirect() {
    window.location.href = 'https://clicca.clubecdp.com.br/';
  }
  get() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.CDPService.index().subscribe(res => {
        const object = JSON.parse(res._body);
        if ( !object.hasOwnProperty("erro") ) {
          this.cdp =  object.slice(0, 4);
          Helpers.removeSpinner();
        }
      }) 
    
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
