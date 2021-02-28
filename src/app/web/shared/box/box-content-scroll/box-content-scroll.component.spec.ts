import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxContentScrollComponent } from './box-content-scroll.component';

describe('BoxContentScrollComponent', () => {
  let component: BoxContentScrollComponent;
  let fixture: ComponentFixture<BoxContentScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxContentScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxContentScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
