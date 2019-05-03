import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteAutoCompleteComponent } from './components/cliente-auto-complete/cliente-auto-complete.component';
import { ProdutoAutoCompleteComponent } from './components/produto-auto-complete/produto-auto-complete.component';

@NgModule({
  declarations: [ClienteAutoCompleteComponent, ProdutoAutoCompleteComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    SharedRoutingModule
  ],
  exports: [ClienteAutoCompleteComponent, ProdutoAutoCompleteComponent]
})
export class SharedModule { }
