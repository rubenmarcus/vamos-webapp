import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { AdvertisersService } from '@clicca-webapp/shared/services/vehicle-selling/advertisers-service/advertisers.service';
import { CepService } from '@clicca-webapp/shared/services/profile-service/cep.service';

import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { noEmoji} from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-my-stores-company',
  templateUrl: './my-stores-company.component.html',
  styleUrls: ['./my-stores-company.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyStoresCompanyComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private user = User.fromCache();
  private getPicture;

  public companyForm: FormGroup;
  public states = Enum.states;
  public maskPhone = InputMask.phoneMask;
  public inputMask = InputMask;
  public messageError = MessageError;
  public profilePicture = '/assets/img/user-profile-pic.png';

  constructor(
    private formBuilder: FormBuilder,
     private advService: AdvertisersService,
     public router: Router,
     private route: ActivatedRoute,
     private cepService: CepService) { }

  ngOnInit() {
    this.createFormUser();
    if ( this.isUpdate() ) {
      this.getInfo();
    }
  }

  isUpdate(): boolean {
    return this.route.snapshot.paramMap.get('id') ? true : false;
  }

  getInfo() {
    Helpers.applySpinner();
    this.subscriptions.push(
      this.advService.show(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.changeMask(res.phone);
        this.profilePicture = res.thumb_url ? res.thumb_url : '/assets/img/user-profile-pic.png';
        Helpers.removeSpinner();
        this.companyForm.get('advertiser').get('name').setValue(res.name);
        this.companyForm.get('advertiser').get('about').setValue(res.about);
        this.companyForm.get('advertiser').get('operating_hours').setValue(res.operating_hours);
        this.companyForm.get('advertiser').get('phone').setValue(res.phone);
        this.companyForm.get('advertiser').get('address_attributes').get('line1').setValue(res.address ? res.address.line1 : '');
        this.companyForm.get('advertiser').get('address_attributes').get('number').setValue(res.address ? res.address.number : '');
        this.companyForm.get('advertiser').get('address_attributes').get('complement').setValue(res.address ? res.address.complement : '');
        this.companyForm.get('advertiser').get('address_attributes').get('city').setValue(res.address ? res.address.city : '');
        this.companyForm.get('advertiser').get('address_attributes').get('state').setValue(res.address ? res.address.state : '');
        this.companyForm.get('advertiser').get('address_attributes').get('zip').setValue(res.address ? res.address.zip : '');
        this.companyForm.get('advertiser').get('address_attributes').get('district').setValue(res.address ? res.address.district : '');
      })
    );
  }

  createFormUser() {
    this.companyForm = this.formBuilder.group({
      advertiser: this.formBuilder.group({
        name: [ '', [ Validators.required,noEmoji  ] ],
        about: [ '', [ Validators.required , noEmoji] ],
        operating_hours: [  '' , [ Validators.required, noEmoji ] ],
        phone: [ '', [ Validators.required, noEmoji] ],
        user_id: this.user.id,
        profile: 'company',
        address_attributes: this.formBuilder.group({
          line1: [ '', [ Validators.required, noEmoji ] ],
          number:  [ '', [ Validators.required, noEmoji ] ],
          complement:  '',
          city:  [ '', [ Validators.required, noEmoji] ],
          state:  [ '', [ Validators.required, noEmoji ] ],
          zip:  [ '', [ Validators.required, noEmoji ] ],
          district:  [ '', [ Validators.required, noEmoji ] ],
        }),
      }),
    });
  }

  changeMask(value){
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
        this.profilePicture = '/assets/img/spinner/spinner-1s-70px.gif';
        const formData = convertModelToFormData( {} );
        formData.append('advertiser[photo]', file);
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

  loadCep(event) {
    if (event.target.value) {
      this.subscriptions.push(
        this.cepService.getaddress(this.companyForm.value.advertiser.address_attributes.zip).subscribe(res => {
          if (!res.erro) {
            this.companyForm.get('advertiser').get('address_attributes').get('line1').setValue(res.logradouro);
            this.companyForm.get('advertiser').get('address_attributes').get('city').setValue(res.localidade);
            this.companyForm.get('advertiser').get('address_attributes').get('state').setValue(res.uf);
            this.companyForm.get('advertiser').get('address_attributes').get('district').setValue(res.bairro);
          }
        })
      );
    }
  }

  submitForm() {
    Helpers.applySpinner();
    this.companyForm.value.advertiser.phone.replace(/[^\d]+/g, '');
    if ( this.isUpdate() ) {
      this.update(this.companyForm.value, true);
    } else {
      this.create();
    }
  }

  create() {
    const formData = convertModelToFormData(this.companyForm.value);
    formData.append('advertiser[photo]', this.getPicture);
    this.subscriptions.push(
      this.advService.create(formData).subscribe(res => {
        Alert.success('Filial cadastrada.');
        this.redirect();
      })
    );
  }

  update(object, redirect = false) {
    this.subscriptions.push(
      this.advService.updateUser(object, this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.profilePicture = res.photo_url;
        if ( redirect ) {
          Alert.success('Filial atualizada com sucesso.');
          this.redirect();
        }
      })
    );
  }

  redirect() {
    Helpers.removeSpinner();
    this.router.navigate(['/perfil/meus-dados/anunciante']);
  }

  isFieldValid(field: string, attr = null) {
    const input = attr ? this.companyForm.get('advertiser').get(attr) : this.companyForm.get('advertiser');
    return !input.get(field).valid && input.get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
