import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalComponent } from './advertise-implemental.component';

describe('AdvertiseImplementalComponent', () => {
  let component: AdvertiseImplementalComponent;
  let fixture: ComponentFixture<AdvertiseImplementalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
