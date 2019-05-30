import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { ProdutoService } from '../../../../base/services/produto.service';
import { BaseComponent } from '../../base/base.component';
import { Endereco } from '../../cliente/endereco';
import { Produto } from '../../produto/produto';
import { Orcamento } from '../orcamento';
import { OrcamentoProduto } from '../orcamento-produto';
import { ProdutoTableRenderComponent } from '../produto-table-render/produto-table-render.component';
import { TotalItemTableRenderComponent } from '../produto-table-render/total-item-table-render.component';
import { ValorUnitarioTableRenderComponent } from '../produto-table-render/valor-unitario-table-render.component';
import { BsLocaleService } from 'ngx-bootstrap';

class ItemOrcamento {
  _id: Number;
  produto: Produto;
  tamanho: String;
  cor: String;
  vlrUnitario: Number;
  quantidade: Number;
  dtaValidade: String;
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
        type: 'custom',
        renderComponent: ValorUnitarioTableRenderComponent,
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
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    const id: string = this.route.snapshot.params.id;

    if (id) {
      this.service.pesquisar(id).subscribe(data => {
        this.orcamento = data;
        this.form.patchValue(this.orcamento);
        this.form.controls.dtaValidade.setValue(new Date(this.orcamento.dtaValidade));
        this.form.controls.endereco.setValue(this.enderecoFormatado(this.endereco));

        this.popularItens();

        if (this.orcamento.situacao === 'FECHADO') {
          this.form.disable();
          this.formProduto.disable();
        }

      }, error => this.toastrService.danger(error));
    }
  }

  popularItens() {
    this.itens = [];
    this.orcamento.orcamentosProdutos.forEach(op => {
      const item = new ItemOrcamento();
      item._id = op._id;
      item.produto = op.produto as Produto;
      item.tamanho = op.tamanho;
      item.cor = (op.produto as Produto).cor;
      item.quantidade = op.quantidade;
      item.vlrUnitario = op.vlrUnitario;

      this.itens.push(item);

      this.calcularValorTotal();
    });

    this.itens = [...this.itens];
  }

  get endereco() {
    const cliente = this.form.controls.cliente.value;
    if (cliente.enderecos) {
      const endereco = cliente.enderecos.filter(e => e.tipo === 'ENTREGA');
      return endereco[0];
    }
  }

  private initForm() {
    this.form = this.fb.group({
      cliente: ['', [Validators.required]],
      endereco: [{ value: '', disabled: true }],
      vlrTotal: [{ value: '0', disabled: true }],
      dtaValidade: ['', []],
      situacao: ['', []],
    });
    this.formProduto = this.fb.group({
      produto: ['', [Validators.required]],
      cor: ['', []],
      quantidade: ['', [Validators.required]],
      vlrUnitario: ['', [Validators.required]],
      tamanho: ['', [Validators.required]],
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

      this.calcularValorTotal();
      this.formProduto.reset();
    } else {
      const mensagem = totalEstoque <= 0 ? 'Sem estoque.' :
        `Estoque insuficiente, somente ${totalEstoque} em estoque.`;
      this.toastrService.danger(mensagem, 'Atenção');
    }
  }

  private calcularValorTotal() {
    const vlrTotal = this.itens.reduce((total, obj) => total + obj.vlrUnitario * obj.quantidade, 0);
    this.form.controls.vlrTotal.setValue(vlrTotal || 0);
  }

  salvar() {
    this.orcamento.orcamentosProdutos = [];
    this.itens.forEach(item => {

      const produto: Produto = item.produto;
      const qtdeEmEstoque = produto.estoque[item.tamanho];
      produto.estoque[item.tamanho] = qtdeEmEstoque - item.quantidade;

      const orcamentoProduto = new OrcamentoProduto();
      orcamentoProduto._id = item._id;
      orcamentoProduto.produto = item.produto._id;
      orcamentoProduto.quantidade = item.quantidade;
      orcamentoProduto.tamanho = item.tamanho;
      orcamentoProduto.vlrUnitario = Number(item.vlrUnitario);

      this.orcamento.orcamentosProdutos = [...this.orcamento.orcamentosProdutos, orcamentoProduto];
    });

    this.produtoService.baixarEstoque(this.orcamento).subscribe(data => {
      console.log('Estoque Produto Atualizado');
    });

    this.orcamento.vlrTotal = Number(this.form.controls.vlrTotal.value || 0);
    this.orcamento.dtaValidade = this.form.controls.dtaValidade.value;

    if (this.orcamento._id) {
      this.service.atualizar(this.orcamento).subscribe(data => {
        this.toastrService.success('Orçamento atualizado com sucesso.', 'Aviso');
      }, error => this.toastrService.danger(error));
    } else {
      this.service.salvar(this.orcamento).subscribe(data => {
        this.toastrService.success('Orçamento salvo com sucesso.', 'Aviso');
        this.reset();
      }, error => this.toastrService.danger(error));
    }
  }

  fecharPedido() {
    this.orcamento.situacao = 'FECHADO';
    this.salvar();
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

    this.popularItens();
  }

  get produto() {
    return this.formProduto.get('produto');
  }

  reset() {
    this.form.reset();
    this.formProduto.reset();
    this.orcamento = new Orcamento();
    this.itens = [];
  }

  goBack() {
    this.router.navigate(['/pages/basic-store/orcamento/orcamento-list']);
  }

  get editando() {
    return this.orcamento && this.orcamento._id;
  }

  private enderecoFormatado(endereco: Endereco) {
    if (endereco) {
      return `${endereco.logradouro}, Nº ${endereco.numero} - ${endereco.cidade} - ${endereco.estado}`;
    }
  }
}
