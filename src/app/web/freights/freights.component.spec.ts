import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightsComponent } from './freights.component';

describe('FretesComponent', () => {
  let component: FreightsComponent;
  let fixture: ComponentFixture<FreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
