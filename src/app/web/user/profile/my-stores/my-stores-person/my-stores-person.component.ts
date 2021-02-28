import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { AdvertisersService } from '@clicca-webapp/shared/services/vehicle-selling/advertisers-service/advertisers.service';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';

import { validatePhone } from '@clicca-webapp/shared/class/validator.method';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-stores-person',
  templateUrl: './my-stores-person.component.html',
  styleUrls: ['./my-stores-person.component.scss']
})
export class MyStoresPersonComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();
  private getPicture;

  public personForm: FormGroup;
  public profile;
  public profilePicture;
  public inputMask = InputMask;
  public maskPhone = InputMask.phoneMask;
  public messageError = MessageError;

  constructor(
    private formBuilder: FormBuilder,
    private advService: AdvertisersService,
    public router: Router,
    private route: ActivatedRoute,
    private cepService: CepService
  ) { }

  ngOnInit() {
    this.get();
    this.createForm(null);
  }

  get() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.advService.getUser(this.user.id).subscribe(res => {
        Helpers.removeSpinner();
        if ( res.objects.length > 0 ) {
          this.profile = res.objects[0];
          this.profilePicture = this.profile.thumb_url;
          this.createForm(this.profile);
        } else {
          this.createForm(null);
        }
      })
    );
  }

  isUpdate(): boolean {
    return this.profile ? true : false;
  }

  createForm(object) {
    this.personForm = this.formBuilder.group({
      advertiser: this.formBuilder.group({
        name: [object ? object.name : '', [Validators.required, noEmoji]],
        about: [object ? object.about : '', [Validators.required, noEmoji]],
        operating_hours: [ object ? object.operating_hours : '', [noEmoji] ] ,
        phone: [object ? object.phone : '', [Validators.required, validatePhone, noEmoji]],
        user_id: this.user.id,
        profile: 'person',
        // address_attributes: this.formBuilder.group({
        //   line1: [ '', [ Validators.required ] ],
        //   number:  [ '', [ Validators.required ] ],
        //   complement:  '',
        //   city:  [ '', [ Validators.required ] ],
        //   state:  [ '', [ Validators.required ] ],
        //   zip:  [ '', [ Validators.required ] ],
        //   district:  [ '', [ Validators.required ] ],
        // }),
      }),
    });
  }

  loadCep(event) {
    if (event.target.value) {
      this.subscriptions.push(
        this.cepService.getaddress(this.personForm.value.advertiser.address_attributes.zip).subscribe(res => {
          if (!res.erro) {
            this.personForm.get('advertiser').get('address_attributes').get('line1').setValue(res.logradouro);
            this.personForm.get('advertiser').get('address_attributes').get('city').setValue(res.localidade);
            this.personForm.get('advertiser').get('address_attributes').get('state').setValue(res.uf);
            this.personForm.get('advertiser').get('address_attributes').get('district').setValue(res.bairro);
          }
        })
      );
    }
  }

  changeMask(value) {
    const regex = /^\([1-9]{2}\) 9/;
    if(regex.test(value)){
      this.maskPhone = InputMask.cellMask;
    }else{
      this.maskPhone = InputMask.phoneMask;
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if ( this.isUpdate() ) {
        const formData = convertModelToFormData( {} );
        formData.append('advertiser[photo]', file);
        this.profilePicture = '/assets/img/spinner/spinner-1s-70px.gif';
        this.update(formData);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePicture = reader.result;
        };
        reader.readAsDataURL(file);
        this.getPicture = file;
      }
    }
  }

  submitForm() {
    Helpers.applySpinner();
    this.personForm.value.advertiser.phone.replace(/[^\d]+/g, '');
    if ( this.isUpdate() ) {
      this.update(this.personForm.value);
    } else {
      this.create(this.personForm.value);
    }
  }

  create(form) {
    const formData = convertModelToFormData(form);
    formData.append('advertiser[photo]', this.getPicture);
    this.subscriptions.push(
      this.advService.create(formData).subscribe(res => {
        Helpers.removeSpinner();
        Alert.success('Anunciante atualizado com sucesso.');
        this.profile = res;
        this.profilePicture = res.thumb_url;
      })
    );
  }

  update(object) {
    this.subscriptions.push(
      this.advService.updateUser(object, this.profile.id).subscribe(res => {
        Helpers.removeSpinner();
        Alert.success('Anunciante atualizado com sucesso.');
        this.profile = res;
        this.profilePicture = res.thumb_url;
      })
    );
  }

  isFieldValid(field: string, attr = null) {
    const input = attr ? this.personForm.get('advertiser').get(attr) : this.personForm.get('advertiser');
    return !input.get(field).valid && input.get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
