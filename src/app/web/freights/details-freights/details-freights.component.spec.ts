import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFreightsComponent } from './details-freights.component';

describe('DetailsFreightsComponent', () => {
  let component: DetailsFreightsComponent;
  let fixture: ComponentFixture<DetailsFreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsFreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
