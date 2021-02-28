import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCanalDaPecaComponent } from './block-canal-da-peca.component';

describe('BlockCanalDaPecaComponent', () => {
  let component: BlockCanalDaPecaComponent;
  let fixture: ComponentFixture<BlockCanalDaPecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCanalDaPecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCanalDaPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
