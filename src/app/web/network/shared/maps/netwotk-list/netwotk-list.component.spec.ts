import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetwotkListComponent } from './netwotk-list.component';

describe('NetwotkListComponent', () => {
  let component: NetwotkListComponent;
  let fixture: ComponentFixture<NetwotkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetwotkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetwotkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
