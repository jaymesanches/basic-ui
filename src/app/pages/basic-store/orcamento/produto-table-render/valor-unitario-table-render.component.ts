import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class ValorUnitarioTableRenderComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;
  renderValue: string;

  ngOnInit() {
    this.renderValue = (this.rowData.vlrUnitario).toFixed(2);
  }
}
