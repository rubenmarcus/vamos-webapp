import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersListComponent } from './my-offers-list.component';

describe('MyOffersListComponent', () => {
  let component: MyOffersListComponent;
  let fixture: ComponentFixture<MyOffersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOffersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
