import { Injectable } from '@angular/core';
import { Cliente } from '../../pages/basic-store/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from './base-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  url = 'http://localhost:4000/api/clientes';

  constructor(protected http: HttpClient) {
    super(http);
  }

  pesquisarPorNome(nome: any) {
    return this.http.get<Cliente>(`${this.url}/search?nome=${nome}`).pipe(
      // map(response => response)
      catchError(this.handleError)
    );
  }

  listar() {
    return this.http.get<Cliente>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  salvar(cliente) {
    return this.http.post<Cliente>(this.url, cliente).pipe(
      catchError(this.handleError)
    );
  }

  atualizar(cliente) {
    return this.http.put<Cliente>(`${this.url}/update/${cliente._id}`, cliente).pipe(
      catchError(this.handleError)
    );
  }

  remover(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
