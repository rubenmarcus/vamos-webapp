import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSmallComponent } from './tag-small.component';

describe('TagSmallComponent', () => {
  let component: TagSmallComponent;
  let fixture: ComponentFixture<TagSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
