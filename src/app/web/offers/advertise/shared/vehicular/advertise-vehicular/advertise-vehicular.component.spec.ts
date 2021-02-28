import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseVehicularComponent } from './advertise-vehicular.component';

describe('AdvertiseVehicularComponent', () => {
  let component: AdvertiseVehicularComponent;
  let fixture: ComponentFixture<AdvertiseVehicularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseVehicularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
