import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularTractorAgriculturalComponent } from './advertise-vehicular-tractor-agricultural.component';

describe('AdvertiseVehicularTractorAgriculturalComponent', () => {
  let component: AdvertiseVehicularTractorAgriculturalComponent;
  let fixture: ComponentFixture<AdvertiseVehicularTractorAgriculturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularTractorAgriculturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularTractorAgriculturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
