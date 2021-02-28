import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansHomeComponent } from './webview-plans-home.component';

describe('WebviewPlansHomeComponent', () => {
  let component: WebviewPlansHomeComponent;
  let fixture: ComponentFixture<WebviewPlansHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
