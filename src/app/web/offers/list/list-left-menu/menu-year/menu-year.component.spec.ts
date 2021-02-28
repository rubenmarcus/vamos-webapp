import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuYearComponent } from './menu-year.component';

describe('MenuYearComponent', () => {
  let component: MenuYearComponent;
  let fixture: ComponentFixture<MenuYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
