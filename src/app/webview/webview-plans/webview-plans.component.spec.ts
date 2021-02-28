import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeviewPlansComponent } from './weview-plans.component';

describe('WeviewPlansComponent', () => {
  let component: WeviewPlansComponent;
  let fixture: ComponentFixture<WeviewPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeviewPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeviewPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
