import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@clicca-webapp/shared/models/authenticator/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';
import { Subscription } from 'rxjs/Rx';
import { ScheduleService } from '@clicca-webapp/shared/services/schedule-service/schedule-service.service';
import { Alert } from '@clicca-webapp/shared/class/alert';
import { Helpers } from '@clicca-webapp/shared/class/helpers';
import { CardService } from '@clicca-webapp/shared/services/card-service/card-service.service';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { convertModelToFormData } from '@clicca-webapp/shared/class/object-to-formdata';


@Component({ preserveWhitespaces: false,
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit, OnDestroy {

  public dep = this.route.snapshot.data.dependent;
  private user;
  private formData;
  private file;
  private noFile = false;
  private noDays = false;
  public scheduleForm;
  public fileCaption;
  fileUploaded = false;
  public formType = 'appointment';
  formLoaded = false;
  owner;
  specialities;
  private subscriptions: Subscription[] = [];
  public states = Enum.states;

  constructor(
    private cardService: CardService,
    private router: Router,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    // console.log(this.dep);
    this.getOwner();
  }


  getSpecialities(){
    this.subscriptions.push(
        this.scheduleService.getSpecialities().subscribe(res => {
          this.specialities = res.objects;
       //   console.log('Specialities', res);
        })
      );
    }


    removePic(){
      this.noFile = true;
      this.fileUploaded = false;
      this.formData = '';
    }

    fileChange(event) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.file = fileList[0];
        const fileCaption = this.file.name;// 30
        const fcLength = 15;
        this.noFile = false;
        const  fileCaptionTrim = fileCaption.length > fcLength ?  '...' + fileCaption.substring( fileCaption.length - fcLength , fileCaption.length) : fileCaption;
       // console.log(this.file , this.formData);
      // let  fileName = '';
      //console.log(fileCaption , fileCaptionTrim);
      this.fileCaption = fileCaptionTrim;
      this.fileUploaded = true;
      // fileName = ( fileName.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.fileList.length );
    }
  }

 getOwner(){
  this.getSpecialities();

  this.subscriptions.push(
    this.cardService.getOwner(User.fromCache().id).subscribe(res => {

      this.owner = res[0];
      // console.log(this.owner);

      this.createForm(res[0].id);
    })
  );
 }

 
 
 onCheckChange(event) {
  const formArray: FormArray = this.scheduleForm.get('best_days') as FormArray;
  if(event.target.checked){
    formArray.push(new FormControl(event.target.value));
   // console.log(this.scheduleForm.value.best_days);
    this.noDays = false;
  } else {
    let i: number = 0;
    formArray.controls.forEach((ctrl: FormControl) => {
      if (ctrl.value === event.target.value) {
        formArray.removeAt(i);
        this.checkBestDays();
       // console.log(this.scheduleForm.value.best_days);
        return;
      }
      i++;
    });
  }
}


isFieldValid(field: string) {
  return !this.scheduleForm.get(field).valid && this.scheduleForm.get(field).touched;
}

  createForm(owner): void {
    const form = {
      type: 'appointment',
      speciality: ['', [Validators.required]],
      account_id: owner,
      best_hour: ['', [Validators.required]],
      best_days: new FormArray([]),
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zone: '',
      description: ['', [Validators.required]]
    };
    this.scheduleForm = this.formBuilder.group(form);
    this.scheduleForm.controls['best_days'].setValidators([Validators.required]);

    this.formLoaded = true;
  }


  setAccount(event) {
    this.scheduleForm.get('account_id').setValue(event.target.value);
  }

  setForm(type: string) {

    if (type === 'exam') {
      this.formType = 'exam';
      this.file = 'a';
      this.scheduleForm.get('type').setValue('exam');
      this.scheduleForm.addControl('exam_group', new FormControl('', Validators.required));
      //this.scheduleForm.addControl('attachment', new FormControl('', Validators.required));
      this.scheduleForm.removeControl('speciality');

    } else {
      this.formType = 'appointment';
      this.scheduleForm.get('type').setValue('appointment');
      this.scheduleForm.removeControl('attachment');
      this.scheduleForm.removeControl('exam_group');
      this.scheduleForm.addControl('speciality', new FormControl('', Validators.required));
    }
   // console.log(type);

    this.formLoaded = true;
  }

  submitForm() {
        if ([this.checkBestDays(),  this.checkFile() ,  ValidateForm.submitValidation(this.scheduleForm)].every(Boolean)) {
          this.submit();
         }
  }
// validateSchedule() {
//   ;
//   this.checkFile();
//   ValidateForm.submitValidation(this.scheduleForm);
//    return true;
// }
  checkBestDays(){
    this.noDays = this.scheduleForm.value.best_days.length === 0;
    return !this.noDays;
  }
  checkFile() {
    this.noFile = (this.formType === 'exam' && !this.file.name);
    return !this.noFile;
  }



  submit() {
    // console.log('Schedule Form' , this.scheduleForm.value);
    Helpers.applySpinner();
    this.formData = convertModelToFormData(this.scheduleForm.value, this.formData,'',false);
    this.formData.append('attachment', this.file);
       // console.log('Best Days' , this.scheduleForm.value.best_days);

    // console.log('Schedule Form', this.formData);
    this.subscriptions.push(
      this.scheduleService.schedule(this.formData).subscribe(res => {
        Alert.success('Agendamento realizado com Sucesso.\n' + 'TICKET:' + res.ticket_id);
        Helpers.removeSpinner();
          this.router.navigateByUrl('/cartao');
      }
    )
  );

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
