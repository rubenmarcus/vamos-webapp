import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularSprayerComponent } from './advertise-vehicular-sprayer.component';

describe('AdvertiseVehicularSprayerComponent', () => {
  let component: AdvertiseVehicularSprayerComponent;
  let fixture: ComponentFixture<AdvertiseVehicularSprayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularSprayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularSprayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
