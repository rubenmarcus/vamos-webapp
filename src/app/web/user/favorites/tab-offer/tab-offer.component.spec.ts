import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdvertsComponent } from './tab-adverts.component';

describe('TabAdvertsComponent', () => {
  let component: TabAdvertsComponent;
  let fixture: ComponentFixture<TabAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
