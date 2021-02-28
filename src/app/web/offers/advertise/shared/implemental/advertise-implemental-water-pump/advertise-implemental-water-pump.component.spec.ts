import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalWaterPumpComponent } from './advertise-implemental-water-pump.component';

describe('AdvertiseImplementalWaterPumpComponent', () => {
  let component: AdvertiseImplementalWaterPumpComponent;
  let fixture: ComponentFixture<AdvertiseImplementalWaterPumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalWaterPumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalWaterPumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
