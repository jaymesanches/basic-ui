import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAutoCompleteComponent } from './produto-auto-complete.component';

describe('ProdutoAutoCompleteComponent', () => {
  let component: ProdutoAutoCompleteComponent;
  let fixture: ComponentFixture<ProdutoAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
