import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAdsComponent } from './block-ads.component';

describe('BlockAdsComponent', () => {
  let component: BlockAdsComponent;
  let fixture: ComponentFixture<BlockAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
