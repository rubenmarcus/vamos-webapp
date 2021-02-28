import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalGraderGradeComponent } from './advertise-implemental-grader-grade.component';

describe('AdvertiseImplementalGraderGradeComponent', () => {
  let component: AdvertiseImplementalGraderGradeComponent;
  let fixture: ComponentFixture<AdvertiseImplementalGraderGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalGraderGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalGraderGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
