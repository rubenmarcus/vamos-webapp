import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Offer } from '@clicca-webapp/shared/models/vehicle-selling';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { OffersService } from '@clicca-webapp/shared/services/vehicle-selling/offers-service/offers.service';
import { DenounceService } from '@clicca-webapp/shared/services/vehicle-selling/denounce-service/denounce.service';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-denounce',
  templateUrl: './denounce.component.html',
  styleUrls: ['./denounce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DenounceComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public validateForm = ValidateForm;
  user;

  public session: boolean;
  public objects;
  public modal = false;
  public offer;
  public denounceForm: FormGroup;
  public message = MessageError;

  constructor(  private formBuilder: FormBuilder,
    private denounceService: DenounceService,
    private offersService: OffersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setSession();

    this.getDenounce();
    this.getOffer();
  }
  private setSession() {
    const helper = new SessionChecker();
    this.user = User.fromCache();
    this.session = helper.isSessionStarted;
    if (this.session) {
    }
  }

  getOffer(){
    Helpers.applySpinner();
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.offersService.show(id).subscribe(res => {
        this.offer = new Offer(res);
        this.offer.images = this.removeEmptyImages(this.offer.images);
        this.createDenounce();
        Helpers.removeSpinner();
      })
    );
  }

  removeEmptyImages(obj) {
    return obj.filter((element, index) => {
      if(element.thumb_url && element.image_url) {
        return element;
      }
    });
  }

  createDenounce() {
    let group = {
      message: ['', [Validators.required]],
      offer_id: [this.route.snapshot.params.id],
      name: [ {value: '', disabled: this.session}, [Validators.required, noEmoji]],
      email: [{value: '', disabled: this.session}, [Validators.required, Validators.email, noEmoji]],
      denunciation_type_id: ['', [Validators.required, noEmoji]]
    }
    if (this.session) {
      group['user_id'] = [{value: this.user.id || '', disabled: !this.session}];
    }
    this.denounceForm = this.formBuilder.group(group);
  }

  getDenounce() {
    this.subscriptions.push(
      this.denounceService.list_type().subscribe(res => {
        this.objects = res.objects;
      })
    );
  }

  sendMessage() {
    if ( this.denounceForm.valid ) {
      Helpers.applySpinner();
      this.denounceService.create(this.denounceForm.value).subscribe(res => {
        this.modal = true;
        Helpers.removeSpinner();
      });
    } else {
      this.validateForm.validateAllFormFields(this.denounceForm);
    }
  }

  // goBack() {
  //   const href = location.href;
  //   const itemid = href.match(/([^\/]*)\/*$/)[1];
  //   this.router.navigateByUrl(`/classificados/detalhes/${itemid}`);
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
