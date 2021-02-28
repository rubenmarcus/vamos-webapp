import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisePhotosComponent } from './advertise-photos.component';

describe('AdvertisePhotosComponent', () => {
  let component: AdvertisePhotosComponent;
  let fixture: ComponentFixture<AdvertisePhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisePhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
