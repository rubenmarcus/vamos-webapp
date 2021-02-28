import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalTrimmerComponent } from './advertise-implemental-trimmer.component';

describe('AdvertiseImplementalTrimmerComponent', () => {
  let component: AdvertiseImplementalTrimmerComponent;
  let fixture: ComponentFixture<AdvertiseImplementalTrimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalTrimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalTrimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
