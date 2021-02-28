import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentAddressComponent } from './webview-plans-payment-address.component';

describe('WebviewPlansPaymentAddressComponent', () => {
  let component: WebviewPlansPaymentAddressComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
