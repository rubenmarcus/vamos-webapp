import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalPlowComponent } from './advertise-implemental-plow.component';

describe('AdvertiseImplementalPlowComponent', () => {
  let component: AdvertiseImplementalPlowComponent;
  let fixture: ComponentFixture<AdvertiseImplementalPlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalPlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalPlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
