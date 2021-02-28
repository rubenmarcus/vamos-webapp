import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentSuccessFreeComponent } from './webview-plans-payment-success-free.component';

describe('WebviewPlansPaymentSuccessFreeComponent', () => {
  let component: WebviewPlansPaymentSuccessFreeComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentSuccessFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentSuccessFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentSuccessFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
