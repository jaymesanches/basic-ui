import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../../base/services/produto.service';
import { BaseComponent } from '../../base/base.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'bsc-produto-estoque',
  templateUrl: './produto-estoque.component.html',
  styleUrls: ['./produto-estoque.component.scss']
})
export class ProdutoEstoqueComponent extends BaseComponent implements OnInit {
  produtos = [];
  columns = [];
  constructor(private produtoService: ProdutoService,
    private toastrService: NbToastrService) {
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
      { prop: 'estoque.xg', name: 'XG' },
      { prop: 'estoque.xxg', name: 'XXG' },
    ];

    this.produtoService.listar().subscribe(data => {
      this.produtos = data as any;
    });
  }

  salvar() {
    this.produtoService.atualizarProdutos(this.produtos).subscribe(data => {
      if ((data as any).success) {
        this.toastrService.success((data as any).success, 'Aviso');
      }
    });
  }

  updateValue(event, cell, rowIndex) {
    this.produtos[rowIndex].estoque[cell] = Number(event.target.value);
  }
}
