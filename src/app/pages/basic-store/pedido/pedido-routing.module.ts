import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import { PedidoComponent } from './pedido.component';

const routes: Routes = [{
  path: '',
  component: PedidoComponent,
  children: [
    {
      path: 'pedido-list',
      component: PedidoListComponent
    },
    {
      path: 'pedido-form',
      component: PedidoFormComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
