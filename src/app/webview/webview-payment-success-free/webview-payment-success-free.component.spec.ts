import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPaymentSuccessFreeComponent } from './webview-payment-success-free.component';

describe('WebviewPaymentSuccessFreeComponent', () => {
  let component: WebviewPaymentSuccessFreeComponent;
  let fixture: ComponentFixture<WebviewPaymentSuccessFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPaymentSuccessFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPaymentSuccessFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
