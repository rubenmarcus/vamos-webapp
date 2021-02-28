import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansPaymentComponent } from './webview-plans-payment.component';

describe('WebviewPlansPaymentComponent', () => {
  let component: WebviewPlansPaymentComponent;
  let fixture: ComponentFixture<WebviewPlansPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
