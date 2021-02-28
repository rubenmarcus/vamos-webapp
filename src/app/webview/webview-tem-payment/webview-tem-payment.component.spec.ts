import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewTemPaymentComponent } from './webview-tem-payment.component';

describe('WebviewTemPaymentComponent', () => {
  let component: WebviewTemPaymentComponent;
  let fixture: ComponentFixture<WebviewTemPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewTemPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewTemPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
