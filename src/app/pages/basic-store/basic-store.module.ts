import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicStoreRoutingModule } from './basic-store-routing.module';
import { BasicStoreComponent } from './basic-store.component';

@NgModule({
  declarations: [BasicStoreComponent],
  imports: [
    CommonModule,
    BasicStoreRoutingModule
  ]
})
export class BasicStoreModule { }
