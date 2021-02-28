import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { MessagesService } from '@clicca-webapp/shared/services/vehicle-selling/messages-service/messages.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';

@Component({ preserveWhitespaces: false,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public chatForm: FormGroup;
  public user = User.fromCache();
  public users = [];
  private offer_id;

  public messages = [];
  public pagination;
  public scrollLoading: boolean = false;
  public titleMessage;
  public typeMsg = false;
  public preload: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.listeningChangeRoutes();
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if ( $event.target.scrollTop === 0 && this.pagination.current_page !== this.pagination.total_pages ) {
      this.loadMessage(this.route.snapshot.params.conversation, { page: this.pagination.current_page + 1 });
    }
  }

  listeningChangeRoutes(): void {
    this.createFormUser();
    this.subscriptions.push(
      this.route.params
        .subscribe(params => {
          Helpers.applySpinner();
          this.byUser();
          this.typeMsg = false;
          if (params.conversation) {
            this.messages = [];
            this.loadMessage(params.conversation);
            this.createFormUser();
            this.typeMsg = true;
          }
      })
    );
  }

  byUser() {
    this.subscriptions.push(
      this.messagesService.by_user(this.user.id).subscribe(res => {
        this.users = this.orderUsers(res.objects);
        this.preload = false;
        Helpers.removeSpinner();
      })
    );
  }

  loadMessage(messageid, params?: any) {
    Helpers.applySpinner();
    this.scrollLoading = true;
    this.subscriptions.push(
      this.messagesService.list_dialog(messageid, params).subscribe(resp => {
        resp.objects.forEach(element => {
          this.messages.push(element);
        });
        if ( resp.pagination.current_page === 1 ) {
          this.titleMessage = resp.objects[0].title;
        }
        this.scrollLoading = false;
        this.pagination = resp.pagination;
        Helpers.removeSpinner();
      })
    );
  }

  sendMessage() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.messagesService.create(this.route.snapshot.params.offer_id, this.chatForm.value).subscribe(res => {
        this.byUser();
        this.messages = [];
        this.loadMessage(this.route.snapshot.params.conversation, {page: 1});
        Helpers.removeSpinner();
        this.chatForm.get('message').get('message').setValue('');
      })
    );
  }

  createFormUser(): void {
    this.chatForm = this.formBuilder.group({
      message: this.formBuilder.group({
        message: ['', [Validators.required]],
        from_id: this.user.id,
        to_id: this.route.snapshot.params.to_id || ''
      })
    });
  }

  orderUsers(array) {
    return array.map(element => {
      if( element.from_id === this.user.id){
        return element;
      }else{
        const object = {
          from_id: element.to_id,
          from_name: element.to_name,
          from_picture: element.to_picture,
          to_id: element.from_id,
          to_name: element.from_name,
          to_picture: element.from_picture
        };
        return Object.assign(element, object);
      }
    });
  }

  checkUser(user): string {
    return this.user.id === user.from_id ? 'dialog__message--sent' : 'dialog__message--received';
  }

  IsUser(user): boolean {
    return this.user.id !== user.from_id;
  }

  goDialog(user) {
    const to_id = user.conversation.replace(this.user.id, '').replace('|', '');
    this.router.navigate([`/perfil/chat/${user.conversation}/${to_id}/${user.offer_id}`]);
    // this.typeMsg = true;
  }

  backMenu() {
    this.router.navigate([`/perfil/chat`]);
    // this.typeMsg = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
