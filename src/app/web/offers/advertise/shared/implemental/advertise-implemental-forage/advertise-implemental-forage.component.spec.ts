import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalForageComponent } from './advertise-implemental-forage.component';

describe('AdvertiseImplementalForageComponent', () => {
  let component: AdvertiseImplementalForageComponent;
  let fixture: ComponentFixture<AdvertiseImplementalForageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalForageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalForageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
