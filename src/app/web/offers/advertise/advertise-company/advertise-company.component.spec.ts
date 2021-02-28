import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseCompanyComponent } from './advertise-company.component';

describe('AdvertiseCompanyComponent', () => {
  let component: AdvertiseCompanyComponent;
  let fixture: ComponentFixture<AdvertiseCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
