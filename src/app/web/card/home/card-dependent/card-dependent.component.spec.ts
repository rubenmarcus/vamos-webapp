import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDependentComponent } from './card-dependent.component';

describe('CardDependentComponent', () => {
  let component: CardDependentComponent;
  let fixture: ComponentFixture<CardDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
