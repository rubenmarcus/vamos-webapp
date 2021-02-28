import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewTemRechargeComponent } from './webview-tem-recharge.component';

describe('WebviewTemRechargeComponent', () => {
  let component: WebviewTemRechargeComponent;
  let fixture: ComponentFixture<WebviewTemRechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewTemRechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewTemRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
