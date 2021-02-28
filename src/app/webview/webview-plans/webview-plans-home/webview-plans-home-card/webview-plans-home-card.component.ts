import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { OfferPlan } from '@clicca-webapp/shared/models/vehicle-selling/offer-plan.model';
import { ParticipantHelper } from "@clicca-webapp/webview/webview-plans/shared/class/participant.helper";
import { MobilePlanService } from '@clicca-webapp/webview/webview-plans/shared/services/mobile-plan-service/mobile-plan.service';

@Component({ preserveWhitespaces: false,
  selector: 'app-webview-plans-home-card',
  templateUrl: './webview-plans-home-card.component.html',
  styleUrls: ['./webview-plans-home-card.component.scss']
})
export class WebviewPlansHomeCardComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() plan;
  @Input() exclusive: boolean = false;
  @Input() free: boolean = false;
  @Output() refreshList = new EventEmitter();

  public currentPlan = this.route.snapshot.data.currentPlan;

  public planColors = {
    free: {
      gradient: 'linear-gradient(-88deg, rgba(66, 147, 33, 1), rgba(180, 236, 81, 1))',
    },
    bronze: {
      gradient: 'linear-gradient(-88deg, rgba(255, 209, 148, 1), rgba(209, 145, 60, 1))',
    },
    silver: {
      gradient: 'linear-gradient(-88deg, rgba(200, 109, 215 , 1), rgba(48, 35, 174, 1))',
    },
    gold: {
      gradient: 'linear-gradient(-88deg, rgba(255, 167, 81, 1), rgba(255, 226, 89, 1))',
    },
    three: {
      gradient: 'linear-gradient(-88deg, rgba(102, 166, 255, 1), rgba(137, 246, 254, 1))',
    },
    exclusive: {
      gradient: 'linear-gradient(-88deg, rgba(40, 111, 196, 1), rgba(116, 173, 242, 1))',
    },
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mobilePlanService: MobilePlanService
  ) { }

  ngOnInit() {
    this.plan = new OfferPlan(this.plan);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentPlan = this.route.snapshot.data.currentPlan;
  }

  setColor() {
    return `linear-gradient(-88deg, ${this.plan.color_start}, ${this.plan.color_end})`;
  }

  signFreePlan() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.mobilePlanService.enableFreeSubscription(this.route.snapshot.queryParams.user_id , this.route.snapshot.queryParams.access_token ).subscribe(
        result => {
          this.route.snapshot.data.profile = result;
          Helpers.removeSpinner();
          this.router.navigate([`/webview/plan/payment/success`], { queryParamsHandling: "merge" });
        },
        error => {
          Helpers.removeSpinner();
          this.router.navigate([`/webview/plan`], { queryParams: {dialogError: error.error.message}, queryParamsHandling: "merge" });
        }
      )
    );
  }

  confirmPlanDeletion() {
    this.router.navigate([`/webview/plan`], { queryParams: {showDialog: this.currentPlan.id}, queryParamsHandling: "merge" });
  }

  isFree(): boolean {
    return this.plan.value === 0;
  }

  isExclusive(): boolean {
    return this.plan.exclusive ? true : false;
  }

  isPlan(): boolean {
    return this.currentPlan ? false : true;
  }

  isPlanFree(): boolean {
    const user = ParticipantHelper.getPaymentUser();
    return user.offers_subscription_available && user.offers_subscription_expires_at;
  }

  isUpdate(): boolean {
    return this.currentPlan.offer_plan.id === this.plan.id ? true : false;
  }

  isCancel(): boolean {
    return this.plan._status === 'active' && !this.route.snapshot.data.currentPlan.cancel_request ? true : false;
  }

  getOffer(): string {
    return `${this.plan.offers} ${this.plan.offers == 1 ? 'oferta' : 'ofertas'}`;
  }

  getPhotos(): string {
    return `Até ${this.plan.photos} ${this.plan.photos == 1 ? 'foto' : 'fotos'}`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
