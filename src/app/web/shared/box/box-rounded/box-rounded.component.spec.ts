import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxRoundedComponent } from './box-rounded.component';

describe('BoxRoundedComponent', () => {
  let component: BoxRoundedComponent;
  let fixture: ComponentFixture<BoxRoundedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxRoundedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
