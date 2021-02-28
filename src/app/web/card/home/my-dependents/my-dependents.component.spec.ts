import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDependentsComponent } from './my-dependents.component';

describe('MyDependentsComponent', () => {
  let component: MyDependentsComponent;
  let fixture: ComponentFixture<MyDependentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDependentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDependentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
