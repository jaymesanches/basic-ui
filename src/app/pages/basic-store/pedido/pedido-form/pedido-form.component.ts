import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base-componente';
import { Orcamento } from '../../orcamento/orcamento';
import { OrcamentoService } from '../../../../base/services/orcamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bsc-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  orcamento: Orcamento;

  constructor(private orcamentoService: OrcamentoService,
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      numOrcamento: ['', []],
    });
  }

  onBlurOrcamento(event) {
    console.log('event', event.target.value);

    this.orcamentoService.findOne({ numero: event.target.value }).subscribe(
      data => this.orcamento = data
    );
  }

}
