import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalHarvesterComponent } from './advertise-implemental-harvester.component';

describe('AdvertiseImplementalHarvesterComponent', () => {
  let component: AdvertiseImplementalHarvesterComponent;
  let fixture: ComponentFixture<AdvertiseImplementalHarvesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalHarvesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalHarvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
