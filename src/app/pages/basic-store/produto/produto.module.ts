import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './produto-routing.module';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoComponent } from './produto.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProdutoEstoqueComponent } from './produto-estoque/produto-estoque.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

const COMPONENTS = [
  ProdutoComponent,
  ProdutoListComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ProdutoEstoqueComponent, ProdutoFormComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,
    ProductRoutingModule
  ]
})
export class ProdutoModule { }
