import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansHomeCardComponent } from './webview-plans-home-card.component';

describe('WebviewPlansHomeCardComponent', () => {
  let component: WebviewPlansHomeCardComponent;
  let fixture: ComponentFixture<WebviewPlansHomeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansHomeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
