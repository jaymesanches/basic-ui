import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base-componente';
import { Orcamento } from '../../orcamento/orcamento';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from '../../cliente/endereco';
import { Cliente } from '../../cliente/cliente';

@Component({
  selector: 'bsc-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  orcamento: Orcamento;
  columns = [];

  constructor(private orcamentoService: OrcamentoService,
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.form = this.fb.group({
      numOrcamento: ['', []],
    });
  }

  onBlurOrcamento(event) {
    this.orcamentoService.findOne({ numero: event.target.value }).subscribe(
      data => this.orcamento = data
    );
  }

  get enderecoDeCobranca() {
    if (this.orcamento) {
      const enderecoCobranca = (this.orcamento.cliente as Cliente).enderecos.find(e => e.tipo === 'COBRANCA');
      return this.getEnderecoFormatado(enderecoCobranca);
    }
  }

  get enderecoDeEntrega() {
    if (this.orcamento) {
      const enderecoEntrega = (this.orcamento.cliente as Cliente).enderecos.find(e => e.tipo === 'ENTREGA');
      return this.getEnderecoFormatado(enderecoEntrega);
    }
  }

  private getEnderecoFormatado(endereco: Endereco) {
    const enderecoFormatado = `${endereco.logradouro}, Nº ${endereco.numero}, Compl. ${endereco.complemento},
     ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.cep}`;

    return enderecoFormatado;
  }

  private initForm() {
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
  }
}
