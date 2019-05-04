import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../../@theme/theme.module';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { OrcamentoService } from '../../../base/services/orcamento.service';

@NgModule({
  declarations: [PedidoComponent, PedidoListComponent, PedidoFormComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  providers: [OrcamentoService]
})
export class PedidoModule { }
