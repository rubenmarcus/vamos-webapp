import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalSprayerComponent } from './advertise-implemental-sprayer.component';

describe('AdvertiseImplementalSprayerComponent', () => {
  let component: AdvertiseImplementalSprayerComponent;
  let fixture: ComponentFixture<AdvertiseImplementalSprayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalSprayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalSprayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
