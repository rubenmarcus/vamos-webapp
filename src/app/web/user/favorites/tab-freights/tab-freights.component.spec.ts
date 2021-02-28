import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFreightsComponent } from './tab-freights.component';

describe('TabFreightsComponent', () => {
  let component: TabFreightsComponent;
  let fixture: ComponentFixture<TabFreightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabFreightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFreightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
