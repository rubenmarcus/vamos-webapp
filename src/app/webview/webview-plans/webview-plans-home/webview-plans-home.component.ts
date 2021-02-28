import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';
import { MobileUserService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-user-service/mobile-user.service';
import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-home',
  templateUrl: './webview-plans-home.component.html',
  styleUrls: ['./webview-plans-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WebviewPlansHomeComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private currentPlan = this.route.snapshot.data.currentPlan;

  public dialogPlan;
  public dialogPlanDelete;
  public dialogError;
  freePlanPlaceholder = false;
  planExpiration;

  public plans = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mobilePlanService: MobilePlanService,
    private mobileUserService: MobileUserService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userToken = this.route.snapshot.queryParams.access_token;


    Helpers.applySpinner();
    this.subscriptions.push(
      this.mobileUserService.show(this.route.snapshot.queryParams.user_id, this.route.snapshot.queryParams.access_token).subscribe(
        result => {
          ParticipantHelper.savePaymentUser(result);
          this.getPlans();
          this.listeningChangeRoutes();
        },
        error => {
          this.router.navigate([`/webview/error`]);
        }
      )
    );
  }

  listeningChangeRoutes(): void {
    this.dialogPlan = this.route.snapshot.queryParams.showDialog;
    this.dialogPlanDelete = this.route.snapshot.queryParams.dialogPlanDelete;
    this.dialogError = this.route.snapshot.queryParams.dialogError;
    this.subscriptions.push(
      this.router.events
        .filter(res => res instanceof NavigationEnd)
        .subscribe((res: NavigationEnd) => {
          this.dialogPlan = this.route.snapshot.queryParams.showDialog;
          this.dialogPlanDelete = this.route.snapshot.queryParams.dialogPlanDelete;
          this.dialogError = this.route.snapshot.queryParams.dialogError;
        })
    );
  }

  isFreePlan(){
    const user = ParticipantHelper.getPaymentUser();
    return (user.offers_subscription_available && user.offers_subscription_expires_at);
  }


  deletePlan() {
    Helpers.applySpinner();
    window.history.back();
    this.subscriptions.push(
      this.mobilePlanService.cencelled(this.route.snapshot.queryParams.showDialog).subscribe(
        result => {
          this.route.snapshot.data.currentPlan.cancel_request = true;
          this.currentPlan = this.route.snapshot.data.currentPlan;
          this.router.navigate([`/webview/plan`], { queryParams: {dialogPlanDelete: 'Cancelamento solicitado'}, queryParamsHandling: "merge" });
          this.getPlans();
        },
        error => {
          this.router.navigate([`/webview/plan`], { queryParams: {dialogError: 'Ocorreu um erro no cancelamento do plano'}, queryParamsHandling: "merge" });
        }
      )
    );
  }
  formatDate(input) {
    if (input) {
      const datePart = input.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];
      return day + '/' + month + '/' + year;
    } else {
      return '';
    }
  }

  getPlans() {
    Helpers.applySpinner();
    const user_id = { user_id: this.route.snapshot.queryParams.user_id };
    this.subscriptions.push(
      this.mobilePlanService.byKind(user_id).subscribe(res => {
        this.plans = res.objects;
        if (!this.isPlan()) {
          this.plans.unshift({ name: 'Plano Grátis', value: 0, offers: 1, photos: 8, free: true });
        }

        if(this.isFreePlan()){
          // console.log('Tem Plano Gratuito');
           this.freePlanPlaceholder = true;

           const user = ParticipantHelper.getPaymentUser();
 
           this.planExpiration = this.formatDate(user.offers_subscription_expires_at);
        
 
         }



        // this.plans.unshift({ name: 'Plano Grátis', value: 0, offers: 2000, photos: 8, free: true });
        this.plans.push({ name: 'Plano Grátis', value: null, exclusive: true });
        Helpers.removeSpinner();
      })
    );
  }

  isPlan(): boolean {
    const user = ParticipantHelper.getPaymentUser();
    return this.currentPlan || (!user.offers_subscription_available || user.offers_subscription_expires_at) ? true : false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
