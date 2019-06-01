import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../../pages/basic-store/produto/produto';
import { catchError, tap, map } from 'rxjs/operators';
import { Orcamento } from '../../pages/basic-store/orcamento/orcamento';
import { OrcamentoProduto } from '../../pages/basic-store/orcamento/orcamento-produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {
  url = `${this.apiUrl}/produtos`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  pesquisarPorDescricao(descricao: any) {
    return this.http.get<Produto>(`${this.url}/search?descricao=${descricao}`).pipe(
      map(response => response)
    );
  }

  listar() {
    return this.http.get<Produto>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  salvar(produto) {
    return this.http.post<Produto>(this.url, produto).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(produto) {
    return this.http.put<Produto>(`${this.url}/update/${produto._id}`, produto).pipe(
      catchError(this.handleError)
    );
  }

  atualizarProdutos(produtos) {
    return this.http.post<Produto[]>(`${this.url}/update-all`, produtos).pipe(
      catchError(this.handleError)
    );
  }

  baixarEstoque(orcamento: Orcamento) {
    return this.http.post(`${this.url}/baixar-estoque`, orcamento).pipe(
      catchError(this.handleError)
    );
  }

  subirEstoque(orcamentoProduto: OrcamentoProduto) {
    return this.http.post(`${this.url}/subir-estoque`, orcamentoProduto).pipe(
      catchError(this.handleError)
    );
  }

  remover(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
