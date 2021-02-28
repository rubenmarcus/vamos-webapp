import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { ProfileService } from '@clicca-webapp/shared/services/profile-service/profile.service';

// import { SessionChecker } from '@clicca-webapp/shared/class/session-checker';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';
import { validateCellphoneBR, Cnpj, validatePhone,noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'user-profile-my-data-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDataCompanyComponent implements OnInit {

  private user = User.fromCache();
  private subscriptions: Subscription[] = [];

  public maskPhone = InputMask.phoneMask;
  public inputMask = InputMask;
  public messageError = MessageError;

  // public session: boolean;
  public companyForm: FormGroup;
  public personData;
  public loaded = false;
  public profilePicture = this.user.picture_profile;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit() {
    // this.setSession();
    this.loadInfo();
  }

  loadInfo() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.profileService.info(this.user.id).subscribe(res => {
        this.personData = res;
        this.createFormUser(res);
        this.profilePicture = res.picture_profile;
        this.loaded = true;
        Helpers.removeSpinner();
      })
    );
  }

  // private setSession() {
  //   const helper = new SessionChecker();
  //   this.session = helper.isSessionStarted;
  //   if (this.session) {
  //     this.user = User.fromCache();
  //     this.profilePicture = this.user.picture_profile;
  //     // console.log('Foto do Perfil', this.profilePicture);
  //   }
  // }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.profilePicture = '/assets/img/spinner/spinner-1s-70px.gif';
      const formData = convertModelToFormData( this.companyForm.value );
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

  createFormUser(profile): void {
    this.companyForm = this.formBuilder.group({
      type: 'company',
      user: this.formBuilder.group({
        email: [{value: this.personData.email,  disabled: true}],
        phone: [this.personData.phone, [Validators.required, validatePhone, noEmoji]],
        second_phone: [this.personData.second_phone || '' , [validatePhone,noEmoji]],
      }),
      company: this.formBuilder.group({
        company_name: [this.personData.profile.company_name || '', [Validators.required ,noEmoji]],
        fantasy_name: [this.personData.profile.fantasy_name || '', [Validators.required,noEmoji]],
        responsible: [this.personData.profile.responsible || '', [Validators.required,noEmoji]],
        role: [this.personData.profile.role || '', [Validators.required,noEmoji]],
        cnpj: [{value: this.personData.profile.cnpj , disabled: true}],
        website: [this.personData.profile.website || '' , [noEmoji]],
      })
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

  submitForm() {
    Helpers.applySpinner();
    this.companyForm.value.user.phone.replace(/[^\d]+/g, '');
    this.companyForm.value.user.second_phone.replace(/[^\d]+/g, '');
    this.subscriptions.push(
      this.profileService.send(this.companyForm.value).subscribe(res => {
        Helpers.removeSpinner();
        Alert.success('Perfil atualizado com sucesso.');
        User.saveCache(res, localStorage.getItem('logged_in'));
        if (res.picture_profile !== undefined) {
          this.profilePicture = res.picture_profile;
          (<HTMLImageElement>document.getElementById('profile-picture')).src = res.picture_profile;
        }
        document.getElementById('profile-username').innerHTML = res.profile.company_name;
      })
    );
  }

  isFieldValid(attr, field: string) {
    return !this.companyForm.get(attr).get(field).valid && this.companyForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
