import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { noEmoji } from '@clicca-webapp/shared/class/validator.method';

@Component({ preserveWhitespaces: false,
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBoxComponent implements OnInit {

  public searchForm: FormGroup;
  private emptyField = true;

  @Input() establishments;
  @Output() search = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      query: ['', [ Validators.required , noEmoji] ],
    });
  }

  typing(event) {
    if(event.target.value.length === 0 && this.emptyField){
      this.emptyField = false;
      this.search.emit(this.searchForm.value);
    }else{
      this.emptyField = true;
    }
  }

  submitForm(): void {
    this.search.emit(this.searchForm.value);
  }

}
