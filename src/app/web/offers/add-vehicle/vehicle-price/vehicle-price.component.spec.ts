import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePriceComponent } from './vehicle-price.component';

describe('VehiclePriceComponent', () => {
  let component: VehiclePriceComponent;
  let fixture: ComponentFixture<VehiclePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
