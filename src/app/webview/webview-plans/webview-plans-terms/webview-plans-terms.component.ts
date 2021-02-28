import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { ContentServiceService } from '@clicca-webapp/shared/services/authenticator-service/content-service/content-service.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-terms',
  templateUrl: './webview-plans-terms.component.html',
  styleUrls: ['./webview-plans-terms.component.scss']
})
export class WebviewPlansTermsComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public termsForm: FormGroup;
  public term;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contentServiceService: ContentServiceService
  ) { }

  ngOnInit() {
    this.getTerms();
    this.createTermsForm();
    // if (this.route.snapshot.queryParams.user_id && this.route.snapshot.queryParams.ip) {
    // } else {
    //   this.router.navigate([`/webview/error`]);
    // }
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

  createTermsForm(): void {
    const obj = JSON.parse(sessionStorage.getItem('payment'));
    const params = this.route.snapshot;
    this.termsForm = this.formBuilder.group({
      term: [obj ? obj['term'] : '', [ Validators.requiredTrue ] ],
      subscription: this.formBuilder.group({
        user_id: [params.queryParams.user_id],
        offer_plan_id: [params.params.offer_plan_id],
      })
    });
  }

  submitForm(){
    const payment = JSON.parse(sessionStorage.getItem('payment')) || {};
    const object = Object.assign(payment, this.termsForm.value);
    sessionStorage.setItem('payment', JSON.stringify( object ));
    this.router.navigate([`/webview/plan/payment/data/${this.route.snapshot.params.offer_plan_id}`], { queryParamsHandling: "merge" });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
