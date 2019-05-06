import { Injectable } from '@angular/core';
import { Orcamento } from '../../pages/basic-store/orcamento/orcamento';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from './baseService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService extends BaseService {
  url = 'http://localhost:4000/api/orcamentos';

  constructor(protected http: HttpClient) {
    super(http);
  }

  search(id?: string | number) {
    id = id ? id : '';
    return this.http.get<Orcamento>(`${this.url}/search/${id}`).pipe(
      catchError(this.handleError),
    );
  }

  findOne(obj: any) {
    return this.http.post<Orcamento>(`${this.url}/findOne`, obj).pipe(
      catchError(this.handleError),
    );
  }

  filter(obj: any) {
    return this.http.post<Orcamento>(`${this.url}/filter`, obj).pipe(
      catchError(this.handleError),
    );
  }

  list() {
    return this.http.get<Orcamento[]>(`${this.url}/list`).pipe(
      catchError(this.handleError),
    );
  }

  post(orcamento: Orcamento) {
    return this.http.post<Orcamento>(`${this.url}/salvar`, orcamento).pipe(
      catchError(this.handleError),
    );
  }
}
