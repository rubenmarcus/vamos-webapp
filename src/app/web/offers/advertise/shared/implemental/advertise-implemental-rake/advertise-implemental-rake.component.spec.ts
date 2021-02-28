import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalRakeComponent } from './advertise-implemental-rake.component';

describe('AdvertiseImplementalRakeComponent', () => {
  let component: AdvertiseImplementalRakeComponent;
  let fixture: ComponentFixture<AdvertiseImplementalRakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalRakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalRakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
