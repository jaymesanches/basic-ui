import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base-componente';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from '../../../../base/services/produto.service';
import { Produto } from '../produto';

@Component({
  selector: 'ngx-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent extends BaseComponent implements OnInit {
  form: FormGroup;

  constructor(private service: ProdutoService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      estoque: this.fb.group({
        u: ['0'],
        pp: ['0'],
        p: ['0'],
        m: ['0'],
        g: ['0'],
        gg: ['0'],
        xg: ['0'],
        xxg: ['0'],
      })
    });
  }

  salvar() {
    let produto = new Produto();
    produto = this.form.value;
    this.service.post(produto).subscribe();
  }

  reset() {
    this.form.reset();
  }

}
