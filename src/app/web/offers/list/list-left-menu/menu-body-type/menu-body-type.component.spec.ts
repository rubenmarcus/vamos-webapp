import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBodyTypeComponent } from './menu-body-type.component';

describe('MenuBodyTypeComponent', () => {
  let component: MenuBodyTypeComponent;
  let fixture: ComponentFixture<MenuBodyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBodyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
