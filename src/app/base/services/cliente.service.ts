import { Injectable } from '@angular/core';
import { Cliente } from '../../pages/basic-store/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from './baseService';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  url = 'http://localhost:4000/api/clientes';

  constructor(protected http: HttpClient) {
    super(http);
  }

  findByName(nome: any) {
    console.log('nome', nome);
    
    return this.http.get<Cliente>(`${this.url}/search?nome=${nome}`).pipe(
      map(response => response)
    );
  }

  get() {
    return this.http.get<Cliente>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  post(Cliente) {
    return this.http.post<Cliente>(this.url, Cliente).pipe(
      catchError(this.handleError)
    );
  }

  put(cliente) {
    console.log('Cliente-body', cliente);
    return this.http.put<Cliente>(`http://localhost:4000/api/clientes/update/${cliente._id}`, cliente).pipe(
      tap( // Log the result or error
        data => console.log('tap', data),
        error => console.log('tap error', error)
      )
      // catchError(this.handleError)
    );
  }

  delete(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
