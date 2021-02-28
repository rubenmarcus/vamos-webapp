import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAllComponent } from './tab-all.component';

describe('TabAllComponent', () => {
  let component: TabAllComponent;
  let fixture: ComponentFixture<TabAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
