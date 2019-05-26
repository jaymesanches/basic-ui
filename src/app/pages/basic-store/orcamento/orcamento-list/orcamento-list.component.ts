import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { BaseComponent } from '../../base/base.component';
import { Orcamento } from '../orcamento';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'bsc-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss'],
})
export class OrcamentoListComponent extends BaseComponent implements OnInit {
  @ViewChild('acoesTmpl') acoesTmpl: TemplateRef<any>;
  @ViewChild('vlrTmpl') vlrTmpl: TemplateRef<any>;
  @ViewChild('dateTmpl') dateTmpl: TemplateRef<any>;
  form: FormGroup;
  orcamentos: Orcamento[] = [];
  columns = [];

  constructor(
    private service: OrcamentoService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.initColumns();
  }

  private initForm() {
    this.form = this.fb.group({
      numOrcamento: ['', []],
      cliente: [{ value: '', disabled: false }, []],
    });
  }

  pesquisar() {
    const filter = {
      numero: Number,
      cliente: Number
    };

    if (this.form.controls.numOrcamento.value) {
      filter.numero = this.form.controls.numOrcamento.value;
    }

    if (this.form.controls.cliente.value) {
      filter.cliente = this.form.controls.cliente.value._id;
    }

    this.service.pesquisarPorFiltros(filter).subscribe(data => {
      if (data && (data as any).length > 0) {
        this.orcamentos = [...data as any];
      } else {
        this.toastrService.danger('Nenhum orçamento encontrado.', 'Aviso');
      }
    });
  }

  imprimir(id) {
    this.router.navigate(['/pages/basic-store/orcamento/orcamento-print', id]);
  }

  reset() {
    this.form.reset();
    this.orcamentos = [];
  }

  editar(id) {
    console.log('edit', id);
    this.router.navigate(['/pages/basic-store/orcamento/orcamento-form', id]);
  }

  private initColumns() {
    this.columns = [
      { prop: 'numero', name: 'Código', width: 80 },
      { prop: 'cliente.nome', name: 'Cliente' },
      { prop: 'vlrTotal', name: 'Valor', cellTemplate: this.vlrTmpl },
      { prop: 'dtaCriacao', name: 'Data', cellTemplate: this.dateTmpl },
      { prop: 'situacao', name: 'Situação' },
      { prop: '_id', name: 'Ações', cellTemplate: this.acoesTmpl },
    ];
  }
}
