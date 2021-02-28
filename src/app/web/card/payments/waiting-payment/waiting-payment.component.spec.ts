import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPaymentComponent } from './waiting-payment.component';

describe('WaitingPaymentComponent', () => {
  let component: WaitingPaymentComponent;
  let fixture: ComponentFixture<WaitingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
