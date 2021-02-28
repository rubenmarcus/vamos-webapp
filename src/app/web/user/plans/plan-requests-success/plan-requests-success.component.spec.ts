import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRequestsSuccessComponent } from './plan-requests-success.component';

describe('PlanRequestsSuccessComponent', () => {
  let component: PlanRequestsSuccessComponent;
  let fixture: ComponentFixture<PlanRequestsSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanRequestsSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRequestsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
