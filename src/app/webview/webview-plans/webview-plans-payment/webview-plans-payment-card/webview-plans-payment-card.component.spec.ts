import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentCardComponent } from './webview-plans-payment-card.component';

describe('WebviewPlansPaymentCardComponent', () => {
  let component: WebviewPlansPaymentCardComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
