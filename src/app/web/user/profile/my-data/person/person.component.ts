import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';
import { UserService } from '@clicca-webapp/shared/services/profile-service/user.service';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';
import { validateCellphoneBR, Cpf, validatePhone , IsAdultAge, validateEmail , noEmoji} from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Alert } from '@clicca-webapp/shared/class/alert';

@Component({ preserveWhitespaces: false,
  selector: 'user-profile-my-data-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDataPersonComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();

  public personForm: FormGroup;
  public loaded = false;
  public inputMask = InputMask;
  public maskPhone = InputMask.phoneMask;
  public profilePicture;
  public messageError = MessageError;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadInfo();
  }


  loadInfo() {
    Helpers.applySpinner();
    this.profilePicture = this.user.picture_profile;
    this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
        this.createFormUser(res);
        this.loaded = true;
        Helpers.removeSpinner();
      })
    );
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.profilePicture = '/assets/img/spinner/spinner-1s-70px.gif';
      const formData = convertModelToFormData( {} );
      formData.append('user[picture_profile]', file);
      this.updatePicture(formData);
    }
  }

  updatePicture(formData) {
    this.subscriptions.push(
      this.profileService.updatePicture(User.fromCache().id, formData).subscribe(res => {
        this.profilePicture = res.picture_profile;
        (<HTMLImageElement>document.getElementById('profile-picture')).src = res.picture_profile;
        User.saveCache(res, localStorage.getItem('logged_in'));
        Helpers.removeSpinner();
      })
    );
  }

  createFormUser(res): void {
    this.personForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: [{value: res.email,  disabled: true}],
        phone: [{value: res.phone, disabled: true}, [Validators.required, validateCellphoneBR, noEmoji]],
        second_phone: [res.second_phone.replace(/[^\d]+/g, '') || '' , [validatePhone, noEmoji]],
        // picture_profile: res.picture_profile || '',
      }),
      person: this.formBuilder.group({
        first_name: [res.profile.first_name,  [Validators.required,noEmoji ]],
        last_name: [res.profile.last_name,  [Validators.required,noEmoji]],
        cpf: [{value: res.profile.cpf, disabled: true}],
        cnh: [res.profile.cnh || ''],
        birth_date: [this.formatDate(res.profile.birth_date) || '' , [IsAdultAge, noEmoji]],
       }),
       type: 'person',
    });
  }

  changeMask(event){
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(event.target.value)){
      this.maskPhone = InputMask.cellMask;
    }else{
      this.maskPhone = InputMask.phoneMask;
    }
  }

  formatDate(input) {
    if (input){
    const datePart = input.match(/\d+/g),
    year = datePart[0],
    month = datePart[1], day = datePart[2];
    return day+'/'+month+'/'+year;
    } else{
      return '';
    }
  }

  submitForm() {
    // this.personForm.value.user.phone.replace(/[^\d]+/g, '');
    this.personForm.value.user.second_phone.replace(/[^\d]+/g, '');
    this.update(this.personForm.value);
  }

  update(object) {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.profileService.send(object).subscribe(res => {
        if (res.picture_profile) {
          this.profilePicture = res.picture_profile;
          (<HTMLImageElement>document.getElementById('profile-picture')).src = res.picture_profile;
        }
        User.saveCache(res, localStorage.getItem('logged_in'));
        document.getElementById('profile-username').innerHTML = res.profile.first_name;
        Alert.success('Perfil atualizado com sucesso.');
        Helpers.removeSpinner();
      })
    );
  }

  isFieldValid(attr, field: string) {
    return !this.personForm.get(attr).get(field).valid && this.personForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
