import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBodyComponent } from './item-body.component';

describe('ItemBodyComponent', () => {
  let component: ItemBodyComponent;
  let fixture: ComponentFixture<ItemBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
