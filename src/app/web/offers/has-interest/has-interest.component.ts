import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { MessagesService } from '@clicca-webapp/shared/services/vehicle-selling/messages-service/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { MessageError } from '@clicca-webapp/shared/class/message-error';

@Component({ preserveWhitespaces: false,
  selector: 'app-has-interest',
  templateUrl: './has-interest.component.html',
  styleUrls: ['./has-interest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HasInterestComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public hasInterestForm: FormGroup;

  public user = User.fromCache();
  public messageError = MessageError;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.createHasInterestForm();
  }

  createHasInterestForm(): void {
    console.log(sessionStorage.getItem('advertiser_by_user'));

    this.hasInterestForm = this.formBuilder.group({
      message: this.formBuilder.group({
        from_id: this.user.id,
        to_id: sessionStorage.getItem('advertiser_by_user'),
        message: ['', [Validators.required]]
      })
    });
  }

  submitForm(): void {
    Helpers.applySpinner();
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.messagesService.create(id, this.hasInterestForm.value).subscribe(res => {
        this.router.navigate([`/perfil/chat/${res.conversation}/${res.to_id}/${res.offer_id}`]);
        Helpers.removeSpinner();
      })
    );
  }

  isFieldValid(attr, field: string) {
    return !this.hasInterestForm.get(attr).get(field).valid && this.hasInterestForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
