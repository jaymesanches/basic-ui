import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../../base/services/produto.service';
import { BaseComponent } from '../../base/base-componente';

@Component({
  selector: 'bsc-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent extends BaseComponent implements OnInit {
  produtos;

  settings = {
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      codigo: {
        title: 'Código',
        type: 'number',
      },
      categoria: {
        title: 'Categoria',
        type: 'string',
      },
      descricao: {
        title: 'Descrição',
        type: 'string',
      },
      peso: {
        title: 'Peso(Gramas)',
        type: 'number',
      },
      cor: {
        title: 'Cor',
        type: 'string',
      },
      valor: {
        title: 'Valor',
        type: 'number',
      }
    },
  };

  constructor(private service: ProdutoService) {
    super();
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.service.get().subscribe(data => {
      this.produtos = data;
      console.log(this.produtos);
    });
  }

  onEditConfirm(event) {
    this.service.put(event.newData).subscribe(data => {
      console.log('DATA EDIT', data);
      event.confirm.resolve();
    }, error => {
      console.log('Error', error);
      event.confirm.reject();
    });
  }

  onCreateConfirm(event) {
    this.service.post(event.newData).subscribe();
    this.produtos = [...this.produtos, event.newData];
    event.confirm.resolve();
  }

  onDeleteConfirm(event) {
    console.log('D>', event, this.produtos);
    this.service.delete(event.data._id).subscribe(data => {
      event.confirm.resolve();
    }, error => event.confirm.reject());
  }
}
