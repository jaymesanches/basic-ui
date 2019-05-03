import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicStoreComponent } from './basic-store.component';

const routes: Routes = [
  {
    path: '',
    component: BasicStoreComponent,
    children: [
      {
        path: 'cliente',
        loadChildren: './cliente/cliente.module#ClienteModule'
      },
      {
        path: 'produto',
        loadChildren: './produto/produto.module#ProdutoModule'
      },
      {
        path: 'orcamento',
        loadChildren: './orcamento/orcamento.module#OrcamentoModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicStoreRoutingModule { }
