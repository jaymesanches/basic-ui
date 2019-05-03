import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEstoqueComponent } from './produto-estoque.component';

describe('ProdutoEstoqueComponent', () => {
  let component: ProdutoEstoqueComponent;
  let fixture: ComponentFixture<ProdutoEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
