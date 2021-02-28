import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseOptionalsComponent } from './advertise-optionals.component';

describe('AdvertiseOptionalsComponent', () => {
  let component: AdvertiseOptionalsComponent;
  let fixture: ComponentFixture<AdvertiseOptionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseOptionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseOptionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
