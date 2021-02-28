import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexcontactComponent } from './flexcontact.component';

describe('FlexcontactComponent', () => {
  let component: FlexcontactComponent;
  let fixture: ComponentFixture<FlexcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
