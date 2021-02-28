import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalMixerWagonComponent } from './advertise-implemental-mixer-wagon.component';

describe('AdvertiseImplementalMixerWagonComponent', () => {
  let component: AdvertiseImplementalMixerWagonComponent;
  let fixture: ComponentFixture<AdvertiseImplementalMixerWagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalMixerWagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalMixerWagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
