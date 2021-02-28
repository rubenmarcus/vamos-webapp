import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseCategoryComponent } from './advertise-category.component';

describe('AdvertiseCategoryComponent', () => {
  let component: AdvertiseCategoryComponent;
  let fixture: ComponentFixture<AdvertiseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
