import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasInterestComponent } from './has-interest.component';

describe('HasInterestComponent', () => {
  let component: HasInterestComponent;
  let fixture: ComponentFixture<HasInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
