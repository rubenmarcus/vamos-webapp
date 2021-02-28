import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthValidateRecoverComponent } from './auth-validate-recover.component';

describe('AuthValidateRecoverComponent', () => {
  let component: AuthValidateRecoverComponent;
  let fixture: ComponentFixture<AuthValidateRecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthValidateRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthValidateRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
