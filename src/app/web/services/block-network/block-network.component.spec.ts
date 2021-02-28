import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockNetworkComponent } from './block-network.component';

describe('BlockNetworkComponent', () => {
  let component: BlockNetworkComponent;
  let fixture: ComponentFixture<BlockNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
