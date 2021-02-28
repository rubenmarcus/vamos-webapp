import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseImplementalGrainExtractorComponent } from './advertise-implemental-grain-extractor.component';

describe('AdvertiseImplementalGrainExtractorComponent', () => {
  let component: AdvertiseImplementalGrainExtractorComponent;
  let fixture: ComponentFixture<AdvertiseImplementalGrainExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseImplementalGrainExtractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseImplementalGrainExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
