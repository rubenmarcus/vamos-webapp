import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularBusComponent } from './advertise-vehicular-bus.component';

describe('AdvertiseVehicularBusComponent', () => {
  let component: AdvertiseVehicularBusComponent;
  let fixture: ComponentFixture<AdvertiseVehicularBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
