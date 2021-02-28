import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFreightsComponent } from './block-freights.component';

describe('BlockFreightsComponent', () => {
  let component: BlockFreightsComponent;
  let fixture: ComponentFixture<BlockFreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockFreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
