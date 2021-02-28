import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCardFreeComponent } from './plan-card-free.component';

describe('PlanCardFreeComponent', () => {
  let component: PlanCardFreeComponent;
  let fixture: ComponentFixture<PlanCardFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCardFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCardFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
