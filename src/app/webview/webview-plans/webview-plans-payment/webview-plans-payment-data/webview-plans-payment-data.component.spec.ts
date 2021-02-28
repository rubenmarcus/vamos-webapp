import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentDataComponent } from './webview-plans-payment-data.component';

describe('WebviewPlansPaymentDataComponent', () => {
  let component: WebviewPlansPaymentDataComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
