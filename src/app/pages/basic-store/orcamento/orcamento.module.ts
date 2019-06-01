import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoComponent } from './orcamento.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { OrcamentoFormComponent } from './orcamento-form/orcamento-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProdutoTableRenderComponent } from './produto-table-render/produto-table-render.component';
import { TotalItemTableRenderComponent } from './produto-table-render/total-item-table-render.component';
import { OrcamentoPrintComponent } from './orcamento-print/orcamento-print.component';
import { ClienteTableRenderComponent } from '../cliente/client-table-render/cliente-table-render.component';
import { ButtonViewTableRenderComponent } from './produto-table-render/button-view-table-render.component';
import { ValorUnitarioTableRenderComponent } from './produto-table-render/valor-unitario-table-render.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    OrcamentoRoutingModule,
    ThemeModule,
    SharedModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    BsDatepickerModule
  ],
  declarations: [OrcamentoComponent,
    OrcamentoListComponent,
    OrcamentoFormComponent,
    ProdutoTableRenderComponent,
    TotalItemTableRenderComponent,
    ValorUnitarioTableRenderComponent,
    ClienteTableRenderComponent,
    ButtonViewTableRenderComponent,
    OrcamentoPrintComponent],
  entryComponents: [ProdutoTableRenderComponent,
    TotalItemTableRenderComponent,
    ValorUnitarioTableRenderComponent,
    ClienteTableRenderComponent,
    ButtonViewTableRenderComponent],
})

export class OrcamentoModule { }
