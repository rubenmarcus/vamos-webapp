import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFreightComponent } from './card-freight.component';

describe('CardFreightComponent', () => {
  let component: CardFreightComponent;
  let fixture: ComponentFixture<CardFreightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFreightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
