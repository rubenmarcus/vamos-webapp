import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalForageWagonComponent } from './advertise-implemental-forage-wagon.component';

describe('AdvertiseImplementalForageWagonComponent', () => {
  let component: AdvertiseImplementalForageWagonComponent;
  let fixture: ComponentFixture<AdvertiseImplementalForageWagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalForageWagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalForageWagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
