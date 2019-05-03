import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoComponent } from './orcamento.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OrcamentoFormComponent } from './orcamento-form/orcamento-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProdutoTableRenderComponent } from './produto-table-render/produto-table-render.component';
import { TotalItemTableRenderComponent } from './produto-table-render/total-item-table-render.component';
import { OrcamentoPrintComponent } from './orcamento-print/orcamento-print.component';
import { ClienteTableRenderComponent } from '../cliente/client-table-render/cliente-table-render.component';
import { ButtonViewTableRenderComponent } from './produto-table-render/button-view-table-render.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    OrcamentoRoutingModule,
    SharedModule,
  ],
  declarations: [OrcamentoComponent, OrcamentoListComponent,
    OrcamentoFormComponent, ProdutoTableRenderComponent,
    TotalItemTableRenderComponent, ClienteTableRenderComponent, ButtonViewTableRenderComponent, 
    OrcamentoPrintComponent],
  entryComponents: [ProdutoTableRenderComponent, TotalItemTableRenderComponent,
    ClienteTableRenderComponent, ButtonViewTableRenderComponent],
})
export class OrcamentoModule { }
