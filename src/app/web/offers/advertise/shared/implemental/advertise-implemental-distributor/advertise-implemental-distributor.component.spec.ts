import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalDistributorComponent } from './advertise-implemental-distributor.component';

describe('AdvertiseImplementalDistributorComponent', () => {
  let component: AdvertiseImplementalDistributorComponent;
  let fixture: ComponentFixture<AdvertiseImplementalDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
