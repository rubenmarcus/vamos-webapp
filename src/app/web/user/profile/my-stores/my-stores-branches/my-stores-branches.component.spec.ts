import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoresBranchesComponent } from './my-stores-branches.component';

describe('MyStoresBranchesComponent', () => {
  let component: MyStoresBranchesComponent;
  let fixture: ComponentFixture<MyStoresBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoresBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStoresBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
