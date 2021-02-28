import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { OfferPlan } from '@clicca-webapp/shared/models/vehicle-selling/offer-plan.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { Subscription } from 'rxjs';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() plan;
  @Input() show: boolean = false;
  @Output() deletePlan = new EventEmitter();
  @Output() proposal = new EventEmitter();
  @Output() enableFreeSubscription = new EventEmitter();

  private currentPlan;

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
    private offerPlansService: OfferPlansService
  ) { }

  ngOnInit() {
    this.currentPlan = this.route.snapshot.data.currentPlan;
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
      this.offerPlansService.enableFreeSubscription(User.fromCache().id).subscribe(res => {
        Helpers.removeSpinner();
        User.saveCache(res, localStorage.getItem('logged_in'));
        this.router.navigate([`/perfil/planos/pagamento/sucesso`], { queryParamsHandling: "merge" });
      })
    );
  }

  confirmPlanDeletion() {
    this.deletePlan.emit(this.currentPlan);
  }

  requestProposal() {
    this.proposal.emit(true);
  }

  getOffer(): string {
    return this.plan.offers == 1 ? `1 oferta` : `${this.plan.offers} ofertas`;
  }

  getPhotos(): string {
    return this.plan.photos == 1 ? `Até 1 foto` : `Até ${this.plan.photos} fotos`;
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
    const user = User.fromCache();
    return user.offers_subscription_available && user.offers_subscription_expires_at;
  }

  convertDate(date) {
    let expiresAt = date.split('-');
    return new Date(expiresAt[0], expiresAt[1] - 1, expiresAt[2]);
  }

  isUpdate(): boolean {
    return this.currentPlan.offer_plan.id === this.plan.id ? true : false;
  }

  isCancel(): boolean {
    return this.plan._status === 'active' && !this.currentPlan.cancel_request ? true : false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
