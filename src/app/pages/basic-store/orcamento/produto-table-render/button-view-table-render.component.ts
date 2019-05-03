import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'button-view',
  template: `<button type="button" class="btn btn-info btn-sm"
  (click)="onClick()">
  <i class="fa fa-print" aria-hidden="true"></i>
  </button>`,
})
export class ButtonViewTableRenderComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() out: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/pages/basic-store/orcamento/orcamento-print', this.value]);
  }
}
