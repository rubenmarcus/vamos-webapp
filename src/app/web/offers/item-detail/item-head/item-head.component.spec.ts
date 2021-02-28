import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeadComponent } from './item-head.component';

describe('ItemHeadComponent', () => {
  let component: ItemHeadComponent;
  let fixture: ComponentFixture<ItemHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
