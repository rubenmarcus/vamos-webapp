import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVehicleComponent } from './card-vehicle.component';

describe('CardVehicleComponent', () => {
  let component: CardVehicleComponent;
  let fixture: ComponentFixture<CardVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
