import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalBalerComponent } from './advertise-implemental-baler.component';

describe('AdvertiseImplementalBalerComponent', () => {
  let component: AdvertiseImplementalBalerComponent;
  let fixture: ComponentFixture<AdvertiseImplementalBalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalBalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalBalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
