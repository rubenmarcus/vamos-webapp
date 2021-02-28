import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewErrorComponent } from './webview-error.component';

describe('WebviewErrorComponent', () => {
  let component: WebviewErrorComponent;
  let fixture: ComponentFixture<WebviewErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
