import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../../base/services/produto.service';
import { BaseComponent } from '../../base/base-componente';

@Component({
  selector: 'ngx-produto-estoque',
  templateUrl: './produto-estoque.component.html',
  styleUrls: ['./produto-estoque.component.scss']
})
export class ProdutoEstoqueComponent extends BaseComponent implements OnInit {
  produtos = [];
  columns = [];
  constructor(private produtoService: ProdutoService) {
    super();
  }

  ngOnInit() {
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'descricao', name: 'Descrição' },
      { prop: 'estoque.u', name: 'Único' },
      { prop: 'estoque.pp', name: 'PP' },
      { prop: 'estoque.p', name: 'P' },
      { prop: 'estoque.m', name: 'M' },
      { prop: 'estoque.g', name: 'G' },
      { prop: 'estoque.gg', name: 'GG' },
    ];

    this.produtoService.get().subscribe(data => {
      this.produtos = data as any;
    });
  }

  salvar() {
    this.produtos.forEach(p => {
      this.produtoService.put(p).subscribe(data => {
        console.log('DATA', data);
      });
    });
  }

  reset() {

  }

  updateValue(event, cell, rowIndex) {
    this.produtos[rowIndex].estoque[cell] = Number(event.target.value);
  }
}
