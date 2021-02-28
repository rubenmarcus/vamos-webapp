import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalGrainStufferComponent } from './advertise-implemental-grain-stuffer.component';

describe('AdvertiseImplementalGrainStufferComponent', () => {
  let component: AdvertiseImplementalGrainStufferComponent;
  let fixture: ComponentFixture<AdvertiseImplementalGrainStufferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalGrainStufferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalGrainStufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
