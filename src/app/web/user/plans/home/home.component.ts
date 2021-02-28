import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferPlansService } from '@clicca-webapp/shared/services/plan-service/offer-plans.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlansHomeComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private currentPlan = this.route.snapshot.data.currentPlan;

  public plans = [];

  public planRequestsForm: FormGroup;
  public error = MessageError;
  public inputMask = InputMask;
  
  freePlanPlaceholder = false;
  planExpiration;
  public modalDeletePlan: boolean = false;
  public modalPropostal: boolean = false;

  constructor(
    private offerPlansService: OfferPlansService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentPlan = this.route.snapshot.data.currentPlan;
    this.getPlans();
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
    this.subscriptions.push(
      this.offerPlansService.byKind({user_id: User.fromCache().id}).subscribe(res => {
        this.plans = res.objects;
        if (!this.isPlan()) {
          this.plans.unshift({ name: 'Plano Grátis', value: 0, offers: 1, photos: 8, free: true });
        }
        if(this.isFreePlan()){
          console.log('Tem Plano Gratuito');
          this.freePlanPlaceholder = true;



          this.planExpiration = this.formatDate(User.fromCache().offers_subscription_expires_at);
       

        }
        // this.plans.unshift({ name: 'Plano Grátis', value: 0, offers: 2000, photos: 8, free: true });
        this.plans.push({ name: 'Plano Exclusivo', exclusive: true });
        Helpers.removeSpinner();
      })
    );
  }

  isFreePlan(){
    return (User.fromCache().offers_subscription_available && User.fromCache().offers_subscription_expires_at);
  }

  isPlan(): boolean {
    return this.currentPlan || (!User.fromCache().offers_subscription_available || User.fromCache().offers_subscription_expires_at) ? true : false;
  }

  getPlanSelected(plan) {
    this.modalDeletePlan = true;
  }

  deletePlan() {
    this.modalDeletePlan = false;
    Helpers.applySpinner();
    this.subscriptions.push(
      this.offerPlansService.cencelled(this.currentPlan.id).subscribe(res => {
        this.route.snapshot.data.currentPlan.cancel_request = true;
        this.currentPlan = this.route.snapshot.data.currentPlan;
        Alert.success('Cancelamento solicitado');
        this.getPlans();
      })
    );
  }

  planRequests() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.offerPlansService.planRequests(this.planRequestsForm.value).subscribe(res => {
        Helpers.removeSpinner();
        this.closeModal();
        this.router.navigate(['/perfil/planos/exclusivo/sucesso']);
        // Alert.success('Proposta enviada. Em breve retornaremos');
      })
    );
  }

  createPlanRequestsForm(): void {
    this.planRequestsForm =  this.formBuilder.group({
      request: this.formBuilder.group({
        offers: [ '' , [noEmoji, Validators.required, Validators.min(1)] ],
        observation: [ '' , [ noEmoji]],
        user_id: [ User.fromCache().id ],
      }),
    });
  }

  isFieldValid(field: string) {
    return !this.planRequestsForm.get('request').get(field).valid && this.planRequestsForm.get('request').get(field).touched;
  }

  closeModal() {
    this.modalDeletePlan = false;
    this.modalPropostal = false;
  }

  getProposal() {
    this.modalPropostal = true;
    this.createPlanRequestsForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
