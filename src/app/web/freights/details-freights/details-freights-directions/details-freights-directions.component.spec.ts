import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFreightsDirectionsComponent } from './details-freights-directions.component';

describe('DetailsFreightsDirectionsComponent', () => {
  let component: DetailsFreightsDirectionsComponent;
  let fixture: ComponentFixture<DetailsFreightsDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFreightsDirectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFreightsDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
