import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentSuccessComponent } from './webview-plans-payment-success.component';

describe('WebviewPlansPaymentSuccessComponent', () => {
  let component: WebviewPlansPaymentSuccessComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
