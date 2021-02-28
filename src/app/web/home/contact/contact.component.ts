import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators, FormControl ,ValidationErrors} from '@angular/forms';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';


import { Alert } from '@clicca-webapp/shared/class/alert';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { FaleConoscoService } from '@clicca-webapp/shared/services/profile-service/fale-conosco.service';
import { validateCellphoneBR, Cpf, validatePhone , IsAdultAge, validateEmail, noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public contactForm;
  public subjects = [];
  private user = User.fromCache();
  loaded = false;
  session;

  public inputMask = InputMask;
  public maskPhone = InputMask.phoneMask;
  public messageError = MessageError;

  constructor(
    private contactService: FaleConoscoService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.session = new SessionChecker().isSessionStarted;

    if(this.session){

      this.loadInfo();

    } else {
      Helpers.applySpinner();
      this.getSubjects();
      this.createFormUser();
      this.loaded = true;
      Helpers.removeSpinner();
    }
  }

  loadInfo() {
    Helpers.applySpinner();
    this.getSubjects();
        this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
       //console.log(res);
        this.createFormUser(res);
        this.loaded = true;
        Helpers.removeSpinner();
      })
    );
  }

  createFormUser(res?): void {
    if(res) {
      if (res.type === 'Person') {
        this.contactForm = this.formBuilder.group({
          name: [res.profile.first_name + res.profile.last_name || '', [Validators.required, noEmoji]],
          email: [res.email || '', [validateEmail, noEmoji]],
          phone: [res.phone || '', [Validators.required, validateCellphoneBR, noEmoji]],
          second_phone: [res.second_phone.replace(/[^\d]+/g, '') || '' , [Validators.required, validatePhone, noEmoji]],
          body: ['', [Validators.required, Validators.maxLength(300), noEmoji]],
          subject_id: ['', [Validators.required, noEmoji]],
          user_id: 'person',
        });
      } else if (res.type === 'Company') {
        this.contactForm = this.formBuilder.group({
          name: [res.profile.fantasy_name || '', [Validators.required, noEmoji]],
          email: [res.email || '', [validateEmail, noEmoji]],
          phone: [res.second_phone || '', [Validators.required, validateCellphoneBR, noEmoji]],
          second_phone: [res.phone.replace(/[^\d]+/g, '') || '' , [Validators.required, validatePhone, noEmoji]],
          body: ['', [Validators.required, Validators.maxLength(300), noEmoji]],
          subject_id: ['', [Validators.required, noEmoji]],
          user_id: 'person',
        });
      } 
    }
  else {

      this.contactForm = this.formBuilder.group({
        name: ['', [Validators.required, noEmoji]],
        email: ['', [validateEmail, noEmoji]],
        phone: ['', [Validators.required, validateCellphoneBR, noEmoji]],
        second_phone: ['' , [Validators.required, validatePhone, noEmoji]],
        body: ['', [Validators.required, Validators.maxLength(300), noEmoji]],
        subject_id: ['', [Validators.required, noEmoji]],
        user_id: 'person',
      });
    }
  }


  isFieldValid(field: string) {
    return !this.contactForm.get(field).valid && this.contactForm.get(field).touched;
  }

  getSubjects() {
    this.contactService.getSubjects().subscribe(res => {

      this.subjects = res.objects;
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        // console.log(control);
      
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.submit(); } else {
      this.validateAllFormFields(this.contactForm);
      window.scroll(0, 500);
    }
  }
  
  submit(){
    Helpers.applySpinner();
    this.subscriptions.push(
      this.contactService.sendMsg(this.contactForm.value).subscribe(res => {
        Helpers.removeSpinner();
        Alert.success('Mensagem enviada com sucesso.');
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

