import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseAboutComponent } from './advertise-about.component';

describe('AdvertiseAboutComponent', () => {
  let component: AdvertiseAboutComponent;
  let fixture: ComponentFixture<AdvertiseAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
