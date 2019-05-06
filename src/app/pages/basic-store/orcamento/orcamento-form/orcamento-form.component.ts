import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { BaseComponent } from '../../base/base-componente';
import { Endereco } from '../../cliente/endereco';
import { Produto } from '../../produto/produto';
import { Orcamento } from '../orcamento';
import { OrcamentoProduto } from '../orcamento-produto';
import { ProdutoTableRenderComponent } from '../produto-table-render/produto-table-render.component';
import { TotalItemTableRenderComponent } from '../produto-table-render/total-item-table-render.component';

class ItemOrcamento {
  produto: Produto;
  tamanho: String;
  cor: String;
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
      cor: {
        title: 'Cor',
        type: 'string',
      },
      tamanho: {
        title: 'Tamanho',
        type: 'string',
      },
      quantidade: {
        title: 'Quantidade',
        type: 'number',
      },
      vlrUnitario: {
        title: 'Valor',
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
    private router: Router,
    private toastrService: NbToastrService) {
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
      cor: ['', []],
      quantidade: ['', [Validators.required]],
      vlrUnitario: ['', [Validators.required]],
      tamanho: ['', [Validators.required]],
      // estoque: this.fb.group({
      //   u: [0],
      //   pp: [0],
      //   p: [0],
      //   m: [0],
      //   g: [0],
      //   gg: [0],
      // })
    });
  }

  adicionarProduto() {
    const item = new ItemOrcamento();
    item.produto = this.formProduto.controls.produto.value;
    item.tamanho = this.formProduto.controls.tamanho.value;
    item.cor = item.produto.cor;
    item.quantidade = Number(this.formProduto.controls.quantidade.value);
    item.vlrUnitario = Number(this.formProduto.controls.vlrUnitario.value);

    const totalEstoque = item.produto.estoque[item.tamanho as any];

    if (item.quantidade <= totalEstoque) {
      this.itens = [...this.itens, item];

      const vlrTotal = this.itens.reduce(
        function (total, obj) { return total + obj.vlrUnitario * obj.quantidade; }, 0);
      this.form.controls.vlrTotal.setValue(vlrTotal);

      this.formProduto.reset();
    } else {
      const mensagem = totalEstoque <= 0 ? 'Sem estoque.' : `Estoque insuficiente, somente ${totalEstoque} em estoque.`;
      this.toastrService.danger(mensagem, 'Atenção');
    }
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
      this.toastrService.success('Orçamento salvo com sucesso.', 'Aviso');
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
    this.produto.setValue(produto);
    this.formProduto.controls.vlrUnitario.setValue(produto.valor);
  }

  onDeleteConfirm(op) {
    this.orcamento.orcamentosProdutos =
      this.orcamento.orcamentosProdutos.filter(item => (item.produto as Produto)._id !== op.data.produto._id);
    this.orcamento.orcamentosProdutos = [...this.orcamento.orcamentosProdutos];
  }

  get produto() {
    return this.formProduto.get('produto');
  }

  reset() {
    this.form.reset();
    this.orcamento = new Orcamento();
    this.itens = [];
  }

  private enderecoFormatado(endereco: Endereco) {
    const enderecoFormatado = `${endereco.logradouro}, Nº ${endereco.numero} - ${endereco.cidade} - ${endereco.estado}`;
    return enderecoFormatado;
  }
}
