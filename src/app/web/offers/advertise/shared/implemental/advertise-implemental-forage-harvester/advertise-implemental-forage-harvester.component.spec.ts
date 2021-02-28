import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalForageHarvesterComponent } from './advertise-implemental-forage-harvester.component';

describe('AdvertiseImplementalForageHarvesterComponent', () => {
  let component: AdvertiseImplementalForageHarvesterComponent;
  let fixture: ComponentFixture<AdvertiseImplementalForageHarvesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalForageHarvesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalForageHarvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
