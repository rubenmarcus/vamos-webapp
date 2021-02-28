import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansTermsComponent } from './webview-plans-terms.component';

describe('WebviewPlansTermsComponent', () => {
  let component: WebviewPlansTermsComponent;
  let fixture: ComponentFixture<WebviewPlansTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
