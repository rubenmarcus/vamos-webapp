import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularHeavyVehicleComponent } from './advertise-vehicular-heavy-vehicle.component';

describe('AdvertiseVehicularHeavyVehicleComponent', () => {
  let component: AdvertiseVehicularHeavyVehicleComponent;
  let fixture: ComponentFixture<AdvertiseVehicularHeavyVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularHeavyVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularHeavyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
