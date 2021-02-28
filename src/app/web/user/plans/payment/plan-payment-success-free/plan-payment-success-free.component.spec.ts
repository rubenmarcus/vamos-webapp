import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentSuccessFreeComponent } from './plan-payment-success-free.component';

describe('PlanPaymentSuccessFreeComponent', () => {
  let component: PlanPaymentSuccessFreeComponent;
  let fixture: ComponentFixture<PlanPaymentSuccessFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPaymentSuccessFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentSuccessFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
