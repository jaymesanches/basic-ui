import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ParametrosEnvio } from '../../shared/components/calculo-frete-correios/parametros-envio';
import { BaseService } from './base-service';


@Injectable({
  providedIn: 'root'
})
export class FreteCorreiosService extends BaseService {

  // url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx';
  url = '/correios';

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*', 
  //     'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
  //   })
  // };

  resultado;
  constructor(protected http: HttpClient) {
    super(http);
  }

  calcularPrecoPrazo(parametros: ParametrosEnvio) {
    const urlParameters = Object.entries(parametros).map(e => e.join('=')).join('&');
    return this.http.get(`${this.url}?${urlParameters}`, { responseType: 'text' }
    ).pipe(
      catchError(this.handleError),
    );


  }

  // buscar(cep: string) {
  //   return this.http
  //     .get(`https://viacep.com.br/ws/${cep}/json/`)
  //     .map(data => this.resultado = this.converterRespostaParaCep(data));

  // }

  // private converterRespostaParaCep(cepNaResposta): Cep {
  //   let cep = new Cep();

  //   cep.cep = cepNaResposta.cep;
  //   cep.logradouro = cepNaResposta.logradouro;
  //   cep.complemento = cepNaResposta.complemento;
  //   cep.bairro = cepNaResposta.bairro;
  //   cep.cidade = cepNaResposta.localidade;
  //   cep.estado = cepNaResposta.uf;
  //   return cep;
  // }
}
