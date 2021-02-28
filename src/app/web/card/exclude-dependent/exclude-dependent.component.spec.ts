import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeDependentComponent } from './exclude-dependent.component';

describe('ExcludeDependentComponent', () => {
  let component: ExcludeDependentComponent;
  let fixture: ComponentFixture<ExcludeDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcludeDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludeDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
