import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalTruckBodyComponent } from './advertise-implemental-truck-body.component';

describe('AdvertiseImplementalTruckBodyComponent', () => {
  let component: AdvertiseImplementalTruckBodyComponent;
  let fixture: ComponentFixture<AdvertiseImplementalTruckBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalTruckBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalTruckBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
