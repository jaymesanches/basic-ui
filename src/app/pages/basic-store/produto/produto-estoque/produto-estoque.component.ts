import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../../base/services/produto.service';
import { BaseComponent } from '../../base/base-componente';
import { Estoque } from '../estoque';

@Component({
  selector: 'ngx-produto-estoque',
  templateUrl: './produto-estoque.component.html',
  styleUrls: ['./produto-estoque.component.scss']
})
export class ProdutoEstoqueComponent extends BaseComponent implements OnInit {
  produtos = [];
  constructor(private produtoService: ProdutoService) {
    super();
  }

  ngOnInit() {
    this.produtoService.get().subscribe(data => {
      this.produtos = data as any;
      this.produtos.forEach(p => {
        if (!p.estoque) {
          p.estoque = new Estoque();
        }
      });
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
}
