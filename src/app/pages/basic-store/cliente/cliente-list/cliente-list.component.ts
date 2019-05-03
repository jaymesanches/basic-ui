import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../../base/services/cliente.service';

@Component({
  selector: 'bsc-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
})
export class ClienteListComponent implements OnInit {
  clientes;
  settings = {
    actions: {
      columnTitle: 'Ações',
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
      nome: {
        title: 'Nome',
        type: 'string',
      },
      email: {
        title: 'E-Mail',
        type: 'string',
      },
      documento: {
        title: 'CPF/CNPJ',
        type: 'string',
      },
    },
  };

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.service.get().subscribe(data => {
      this.clientes = data;
      console.log(this.clientes);
    });
  }

  onEditConfirm(event) {
    console.log('E>', event.data);
    this.service.put(event.newData).subscribe(data => {
      console.log('DATA EDIT', data);
      event.confirm.resolve();
    }, error => {
      console.log('Error', error);
      event.confirm.reject();
    });
  }

  onCreateConfirm(event) {
    console.log('C>', event, this.clientes);
    this.service.post(event.newData).subscribe();
    this.clientes = [...this.clientes, event.newData];
    event.confirm.resolve();
  }

  onDeleteConfirm(event) {
    this.service.delete(event.data._id).subscribe(data => {
      event.confirm.resolve();
    }, error => event.confirm.reject());
  }

}
