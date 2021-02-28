import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoresPersonComponent } from './my-stores-person.component';

describe('MyStoresPersonComponent', () => {
  let component: MyStoresPersonComponent;
  let fixture: ComponentFixture<MyStoresPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoresPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoresPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
