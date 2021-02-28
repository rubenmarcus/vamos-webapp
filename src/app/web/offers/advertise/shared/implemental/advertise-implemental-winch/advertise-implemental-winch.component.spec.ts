import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalWinchComponent } from './advertise-implemental-winch.component';

describe('AdvertiseImplementalWinchComponent', () => {
  let component: AdvertiseImplementalWinchComponent;
  let fixture: ComponentFixture<AdvertiseImplementalWinchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalWinchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalWinchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
