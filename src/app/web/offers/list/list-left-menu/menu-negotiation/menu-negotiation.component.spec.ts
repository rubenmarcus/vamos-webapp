import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNegotiationComponent } from './menu-negotiation.component';

describe('MenuNegotiationComponent', () => {
  let component: MenuNegotiationComponent;
  let fixture: ComponentFixture<MenuNegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
