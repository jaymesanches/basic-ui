import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base-componente';
import { ClienteService } from '../../../../base/services/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from '../cliente';
import { Endereco } from '../endereco';

@Component({
  selector: 'ngx-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formEnderecoCobranca: FormGroup;
  formEnderecoEntrega: FormGroup;
  constructor(private service: ClienteService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      nome: ['', []],
      instagram: ['', []],
      email: ['', []],
      documento: ['', []],
    });

    this.formEnderecoCobranca = this.fb.group({
      cepCobranca: ['', []],
      logradouroCobranca: ['', []],
      numeroCobranca: ['', []],
      complementoCobranca: ['', []],
      cidadeCobranca: ['', []],
      estadoCobranca: ['', []],
      bairroCobranca: ['', []],
      referenciaCobranca: ['', []],
    });

    this.formEnderecoEntrega = this.fb.group({
      cepEntrega: ['', []],
      logradouroEntrega: ['', []],
      numeroEntrega: ['', []],
      complementoEntrega: ['', []],
      cidadeEntrega: ['', []],
      estadoEntrega: ['', []],
      bairroEntrega: ['', []],
      referenciaEntrega: ['', []],
    });
  }

  salvar() {
    const cliente = new Cliente();
    cliente.codigo = this.form.controls.codigo.value;
    cliente.nome = this.form.controls.nome.value;
    cliente.documento = this.form.controls.documento.value;
    cliente.email = this.form.controls.email.value;

    const enderecoCobranca = new Endereco();
    enderecoCobranca.tipo = 'COBRANCA';
    enderecoCobranca.cep = this.formEnderecoCobranca.controls.cepCobranca.value;
    enderecoCobranca.logradouro = this.formEnderecoCobranca.controls.logradouroCobranca.value;
    enderecoCobranca.numero = this.formEnderecoCobranca.controls.numeroCobranca.value;
    enderecoCobranca.complemento = this.formEnderecoCobranca.controls.complementoCobranca.value;
    enderecoCobranca.cidade = this.formEnderecoCobranca.controls.cidadeCobranca.value;
    enderecoCobranca.estado = this.formEnderecoCobranca.controls.estadoCobranca.value;
    enderecoCobranca.bairro = this.formEnderecoCobranca.controls.bairroCobranca.value;

    const enderecoEntrega = new Endereco();
    enderecoEntrega.tipo = 'ENTREGA';
    enderecoEntrega.cep = this.formEnderecoEntrega.controls.cepEntrega.value;
    enderecoEntrega.logradouro = this.formEnderecoEntrega.controls.logradouroEntrega.value;
    enderecoEntrega.numero = this.formEnderecoEntrega.controls.numeroEntrega.value;
    enderecoEntrega.complemento = this.formEnderecoEntrega.controls.complementoEntrega.value;
    enderecoEntrega.cidade = this.formEnderecoEntrega.controls.cidadeEntrega.value;
    enderecoEntrega.estado = this.formEnderecoEntrega.controls.estadoEntrega.value;
    enderecoEntrega.bairro = this.formEnderecoEntrega.controls.bairroEntrega.value;

    cliente.enderecos.push(enderecoCobranca, enderecoEntrega);

    this.service.post(cliente).subscribe(data => {

    });
  }

  copiarEndereco() {
    this.formEnderecoEntrega.controls.cepEntrega.setValue(
      this.formEnderecoCobranca.controls.cepCobranca.value);
    this.formEnderecoEntrega.controls.logradouroEntrega.setValue(
      this.formEnderecoCobranca.controls.logradouroCobranca.value);
    this.formEnderecoEntrega.controls.numeroEntrega.setValue(
      this.formEnderecoCobranca.controls.numeroCobranca.value);
    this.formEnderecoEntrega.controls.complementoEntrega.setValue(
      this.formEnderecoCobranca.controls.complementoCobranca.value);
    this.formEnderecoEntrega.controls.cidadeEntrega.setValue(
      this.formEnderecoCobranca.controls.cidadeCobranca.value);
    this.formEnderecoEntrega.controls.estadoEntrega.setValue(
      this.formEnderecoCobranca.controls.estadoCobranca.value);
    this.formEnderecoEntrega.controls.bairroEntrega.setValue(
      this.formEnderecoCobranca.controls.bairroCobranca.value);
  }
}
