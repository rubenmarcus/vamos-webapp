import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalSeedDrillComponent } from './advertise-implemental-seed-drill.component';

describe('AdvertiseImplementalSeedDrillComponent', () => {
  let component: AdvertiseImplementalSeedDrillComponent;
  let fixture: ComponentFixture<AdvertiseImplementalSeedDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalSeedDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalSeedDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
