import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentServiceService } from '@clicca-webapp/shared/services/authenticator-service/content-service/content-service.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';

@Component({ preserveWhitespaces: false,
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TermsOfUseComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public term;

  constructor(
    private contentServiceService: ContentServiceService
  ) { }

  ngOnInit() {
    this.getTerms();
  }

  getTerms() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.contentServiceService.terms().subscribe(res => {
        this.term = res.body;
        Helpers.removeSpinner();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
