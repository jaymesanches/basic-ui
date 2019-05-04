import { Injectable } from '@angular/core';
import { BaseService } from './baseService';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../../pages/basic-store/produto/produto';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService {
  url = 'http://localhost:4000/api/produtos';

  constructor(protected http: HttpClient) {
    super(http);
  }

  findByName(descricao: any) {
    return this.http.get<Produto>(`${this.url}/search?descricao=${descricao}`).pipe(
      map(response => response)
    );
  }

  get() {
    return this.http.get<Produto>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  post(produto) {
    return this.http.post<Produto>(this.url, produto).pipe(
      catchError(this.handleError)
    );
  }

  put(produto) {
    return this.http.put<Produto>(`${this.url}/update/${produto._id}`, produto).pipe(
      catchError(this.handleError)
    );
  }

  delete(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
