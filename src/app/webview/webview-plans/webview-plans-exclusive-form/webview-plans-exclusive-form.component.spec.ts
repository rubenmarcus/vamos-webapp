import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansExclusiveFormComponent } from './webview-plans-exclusive-form.component';

describe('WebviewPlansExclusiveFormComponent', () => {
  let component: WebviewPlansExclusiveFormComponent;
  let fixture: ComponentFixture<WebviewPlansExclusiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansExclusiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansExclusiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
