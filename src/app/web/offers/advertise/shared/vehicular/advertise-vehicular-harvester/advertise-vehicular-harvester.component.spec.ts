import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularHarvesterComponent } from './advertise-vehicular-harvester.component';

describe('AdvertiseVehicularHarvesterComponent', () => {
  let component: AdvertiseVehicularHarvesterComponent;
  let fixture: ComponentFixture<AdvertiseVehicularHarvesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularHarvesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularHarvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
