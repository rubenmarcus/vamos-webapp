import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-exclusive-form',
  templateUrl: './webview-plans-exclusive-form.component.html',
  styleUrls: ['./webview-plans-exclusive-form.component.scss']
})
export class WebviewPlansExclusiveFormComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public planRequestsForm: FormGroup;
  public error = MessageError;
  public inputMask = InputMask;

  public dialogSuccess: boolean = false;
  public dialogError;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mobilePlanService: MobilePlanService
  ) { }

  ngOnInit() {
    this.createPlanRequestsForm();
  }

  createPlanRequestsForm(): void {
    this.planRequestsForm =  this.formBuilder.group({
      request: this.formBuilder.group({
        offers: [ null, [Validators.required, Validators.min(1)] ],
        observation: [ '' ],
        user_id: [ this.route.snapshot.queryParams.user_id ],
      }),
    });
  }

  planRequests() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.mobilePlanService.planRequests(this.planRequestsForm.value).subscribe(
        result => {
          Helpers.removeSpinner();
          this.dialogSuccess = true;
        },
        error => {
          Helpers.removeSpinner();
          this.dialogError = error.error.message;
        }
      )
    );
  }

  isFieldValid(field: string) {
    return !this.planRequestsForm.get('request').get(field).valid && this.planRequestsForm.get('request').get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
