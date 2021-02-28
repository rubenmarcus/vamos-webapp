import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularTruckComponent } from './advertise-vehicular-truck.component';

describe('AdvertiseVehicularTruckComponent', () => {
  let component: AdvertiseVehicularTruckComponent;
  let fixture: ComponentFixture<AdvertiseVehicularTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
