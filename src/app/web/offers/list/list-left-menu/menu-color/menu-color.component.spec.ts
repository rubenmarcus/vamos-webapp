import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuColorComponent } from './menu-color.component';

describe('MenuColorComponent', () => {
  let component: MenuColorComponent;
  let fixture: ComponentFixture<MenuColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
