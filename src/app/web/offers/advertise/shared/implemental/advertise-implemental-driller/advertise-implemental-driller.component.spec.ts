import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalDrillerComponent } from './advertise-implemental-driller.component';

describe('AdvertiseImplementalDrillerComponent', () => {
  let component: AdvertiseImplementalDrillerComponent;
  let fixture: ComponentFixture<AdvertiseImplementalDrillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalDrillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalDrillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
