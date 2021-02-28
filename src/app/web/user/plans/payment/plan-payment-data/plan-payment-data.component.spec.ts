import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentDataComponent } from './plan-payment-data.component';

describe('PlanPaymentDataComponent', () => {
  let component: PlanPaymentDataComponent;
  let fixture: ComponentFixture<PlanPaymentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPaymentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
