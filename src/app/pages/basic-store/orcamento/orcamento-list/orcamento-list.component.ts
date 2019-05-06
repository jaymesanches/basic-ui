import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { BaseComponent } from '../../base/base-componente';
import { Orcamento } from '../orcamento';
import { ClienteTableRenderComponent } from '../../cliente/client-table-render/cliente-table-render.component';
import { ButtonViewTableRenderComponent } from '../produto-table-render/button-view-table-render.component';

@Component({
  selector: 'bsc-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss'],
})
export class OrcamentoListComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  orcamentos: Orcamento[] = [];
  settings = {
    hideSubHeader: true,
    noDataMessage: 'Nenhum produto adicionado',
    actions: {
      columnTitle: 'Remover',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      numero: {
        title: 'Número',
        type: 'number',
      },
      cliente: {
        title: 'Cliente',
        type: 'custom',
        renderComponent: ClienteTableRenderComponent,
      },
      vlrTotal: {
        title: 'Valor',
        type: 'number',
      },
      _id: {
        title: 'Imprimir',
        type: 'custom',
        renderComponent: ButtonViewTableRenderComponent,
        onComponentInitFunction(instance) {
          instance.out.subscribe(row => {
            alert(`${row} saved!`);
          });
        },
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
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      numOrcamento: ['', []],
      cliente: ['', []],
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

    this.service.filter(filter).subscribe(data => {
      this.orcamentos = data as any;
      this.orcamentos = [...this.orcamentos];
    });
  }

  imprimir(id) {
    this.router.navigate(['/orcamentos/print', id]);
  }

  onSelectCliente(cliente) {
    this.form.controls.cliente.setValue(cliente);
  }

  reset() {
    this.form.reset();
    this.orcamentos = [];
  }
}
