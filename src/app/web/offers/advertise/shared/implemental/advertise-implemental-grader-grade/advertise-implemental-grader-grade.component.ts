import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enum } from '@clicca-webapp/shared/class/enum';
import { InputMask } from '@clicca-webapp/shared/class/input-mask';
import { Validate } from '@clicca-webapp/shared/class/validator.method';
import { MessageError } from '@clicca-webapp/shared/class/message-error';
import { ValidateForm } from '@clicca-webapp/shared/class/validate-form';

@Component({ preserveWhitespaces: false,
  selector: 'app-advertise-implemental-grader-grade',
  templateUrl: './advertise-implemental-grader-grade.component.html',
  styleUrls: ['./advertise-implemental-grader-grade.component.scss']
})
export class AdvertiseImplementalGraderGradeComponent implements OnInit {

  @Input() advertiseForm: FormGroup;

  private subscriptions: Subscription[] = [];

  public condition = Enum.condition;
  public options = InputMask.number;
  public yearMask = InputMask.yearMask;

  public message = MessageError;
  public validateForm = ValidateForm;

  constructor() { }

  ngOnInit() {
    this.setValidators();
    this.setYear();
  }

  setYear() {
    if ( this.advertiseForm.get('implement').get('year').value === 0 ) {
      this.advertiseForm.get('implement').get('year').setValue(null);
    }
  }

  setValidators() {
    this.advertiseForm.get('implement').get('year').setValidators([Validators.required, Validate.year]);
    this.advertiseForm.get('implement').get('discs').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('diameter_discs').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('working_depth').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('bearing').setValidators([Validators.required]);
    this.advertiseForm.get('implement').get('working_width').setValidators([Validators.required]);
  }

  isFieldValid(attr, field: string) {
    return !this.advertiseForm.get(attr).get(field).valid && this.advertiseForm.get(attr).get(field).touched;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
