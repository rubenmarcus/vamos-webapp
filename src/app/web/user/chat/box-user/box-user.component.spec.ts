import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxUserComponent } from './box-user.component';

describe('BoxUserComponent', () => {
  let component: BoxUserComponent;
  let fixture: ComponentFixture<BoxUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
