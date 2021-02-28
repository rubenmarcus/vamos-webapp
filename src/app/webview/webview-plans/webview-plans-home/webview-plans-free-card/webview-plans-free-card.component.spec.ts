import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebviewPlansFreeCardComponent } from './webview-plans-free-card.component';

describe('WebviewPlansFreeCardComponent', () => {
  let component: WebviewPlansFreeCardComponent;
  let fixture: ComponentFixture<WebviewPlansFreeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebviewPlansFreeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPlansFreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
