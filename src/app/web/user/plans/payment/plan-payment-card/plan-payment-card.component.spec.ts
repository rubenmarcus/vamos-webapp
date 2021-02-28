import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentCardComponent } from './plan-payment-card.component';

describe('PlanPaymentCardComponent', () => {
  let component: PlanPaymentCardComponent;
  let fixture: ComponentFixture<PlanPaymentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPaymentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
