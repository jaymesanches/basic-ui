import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoComponent } from './produto.component';
import { ProdutoEstoqueComponent } from './produto-estoque/produto-estoque.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

const routes: Routes = [{
  path: '',
  component: ProdutoComponent,
  children: [
    {
      path: 'produto-list',
      component: ProdutoListComponent
    },
    {
      path: 'produto-form',
      component: ProdutoFormComponent
    },
    {
      path: 'produto-estoque',
      component: ProdutoEstoqueComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
