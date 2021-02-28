import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCheckComponent } from './url-check.component';

describe('UrlCheckComponent', () => {
  let component: UrlCheckComponent;
  let fixture: ComponentFixture<UrlCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
