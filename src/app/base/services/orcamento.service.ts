import { Injectable } from '@angular/core';
import { Orcamento } from '../../pages/basic-store/orcamento/orcamento';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService extends BaseService {
  url = `${this.apiUrl}/orcamentos`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  pesquisar(id?: string | number) {
    id = id ? id : '';
    return this.http.get<Orcamento>(`${this.url}/search/${id}`).pipe(
      catchError(this.handleError),
    );
  }

  pesquisarPorFiltros(filtro: any) {
    return this.http.post<Orcamento>(`${this.url}/filter`, filtro).pipe(
      catchError(this.handleError),
    );
  }

  listar() {
    return this.http.get<Orcamento[]>(`${this.url}/list`).pipe(
      catchError(this.handleError),
    );
  }

  salvar(orcamento: Orcamento) {
    return this.http.post<Orcamento>(`${this.url}/salvar`, orcamento).pipe(
      catchError(this.handleError),
    );
  }

  atualizar(orcamento: Orcamento) {
    return this.http.put<Orcamento>(`${this.url}`, orcamento).pipe(
      catchError(this.handleError),
    );
  }
}
