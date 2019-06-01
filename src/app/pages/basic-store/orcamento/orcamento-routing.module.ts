import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrcamentoComponent } from './orcamento.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { OrcamentoFormComponent } from './orcamento-form/orcamento-form.component';
import { OrcamentoPrintComponent } from './orcamento-print/orcamento-print.component';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoComponent,
    children: [
      {
        path: 'orcamento-form',
        component: OrcamentoFormComponent,
      },
      {
        path: 'orcamento-form/:id',
        component: OrcamentoFormComponent,
      },
      {
        path: 'orcamento-list',
        component: OrcamentoListComponent,
      },
      {
        path: 'orcamento-print/:id',
        component: OrcamentoPrintComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentoRoutingModule { }
