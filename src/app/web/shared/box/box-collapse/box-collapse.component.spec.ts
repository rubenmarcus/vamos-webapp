import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCollapseComponent } from './box-collapse.component';

describe('BoxCollapseComponent', () => {
  let component: BoxCollapseComponent;
  let fixture: ComponentFixture<BoxCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
