import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@NgModule({
  declarations: [ClienteComponent, ClienteListComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    CustomersRoutingModule
  ]
})
export class ClienteModule { }
