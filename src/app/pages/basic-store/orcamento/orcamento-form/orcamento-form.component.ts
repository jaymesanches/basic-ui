import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { BaseComponent } from '../../base/base-componente';
import { Endereco } from '../../cliente/endereco';
import { Produto } from '../../produto/produto';
import { Orcamento } from '../orcamento';
import { OrcamentoProduto } from '../orcamento-produto';
import { ProdutoTableRenderComponent } from '../produto-table-render/produto-table-render.component';
import { TotalItemTableRenderComponent } from '../produto-table-render/total-item-table-render.component';
import { Router } from '@angular/router';

class ItemOrcamento {
  produto: Produto;
  vlrUnitario: Number;
  quantidade: Number;
}

@Component({
  selector: 'bsc-orcamento-form',
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['./orcamento-form.component.scss'],
})
export class OrcamentoFormComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formProduto: FormGroup;
  orcamento: Orcamento = new Orcamento();

  itens = [];

  settings = {
    hideSubHeader: true,
    noDataMessage: 'Nenhum produto adicionado',
    actions: {
      columnTitle: 'Remover',
      add: false,
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      produto: {
        title: 'Produto',
        type: 'custom',
        renderComponent: ProdutoTableRenderComponent,
      },
      vlrUnitario: {
        title: 'Valor',
        type: 'number',
      },
      quantidade: {
        title: 'Quantidade',
        type: 'number',
      },
      total: {
        title: 'Total',
        type: 'custom',
        renderComponent: TotalItemTableRenderComponent,
      },
    },
  };

  constructor(
    private service: OrcamentoService,
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      cliente: ['', [Validators.required]],
      endereco: [{ value: '', disabled: true }],
      vlrTotal: [{ value: '', disabled: true }],
    });
    this.formProduto = this.fb.group({
      produto: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      vlrUnitario: ['', [Validators.required]],
    });
  }

  adicionarProduto() {
    const item = new ItemOrcamento();
    item.produto = this.formProduto.controls.produto.value;
    item.quantidade = Number(this.formProduto.controls.quantidade.value);
    item.vlrUnitario = Number(this.formProduto.controls.vlrUnitario.value);

    this.itens = [...this.itens, item];

    const vlrTotal = this.itens.reduce(
      function (total, obj) { return total + obj.vlrUnitario * obj.quantidade; }, 0);
    this.form.controls.vlrTotal.setValue(vlrTotal);

    this.formProduto.reset();
  }

  salvar() {
    this.orcamento.orcamentosProdutos = [];

    this.itens.forEach(item => {
      const orcamentoProduto = new OrcamentoProduto();
      orcamentoProduto.produto = item.produto._id;
      orcamentoProduto.quantidade = item.quantidade;
      orcamentoProduto.vlrUnitario = item.vlrUnitario;

      this.orcamento.orcamentosProdutos = [...this.orcamento.orcamentosProdutos, orcamentoProduto];
    });

    this.orcamento.vlrTotal = this.form.controls.vlrTotal.value;

    this.service.post(this.orcamento).subscribe(data => {
    });
  }

  print() {
    this.router.navigate(['/orcamento-print', this.orcamento._id]);
  }

  onSelectCliente(cliente) {
    this.form.get('cliente').setValue(cliente);
    const endereco = cliente.enderecos.filter(e => e.tipo === 'ENTREGA');

    this.form.controls.endereco.setValue(this.enderecoFormatado(endereco[0]));
    this.orcamento.cliente = cliente._id;
  }

  onSelectProduto(produto) {
    this.formProduto.get('produto').setValue(produto);
  }

  onDeleteConfirm(op) {
    this.orcamento.orcamentosProdutos =
      this.orcamento.orcamentosProdutos.filter(item => (item.produto as Produto)._id !== op.data.produto._id);
    this.orcamento.orcamentosProdutos = [...this.orcamento.orcamentosProdutos];
  }

  private enderecoFormatado(endereco: Endereco) {
    const enderecoFormatado = `${endereco.logradouro}, Nº ${endereco.numero} - ${endereco.cidade} - ${endereco.estado}`;
    return enderecoFormatado;
  }
}
