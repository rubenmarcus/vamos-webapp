import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoresCompanyComponent } from './my-stores-company.component';

describe('MyStoresCompanyComponent', () => {
  let component: MyStoresCompanyComponent;
  let fixture: ComponentFixture<MyStoresCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoresCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoresCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
