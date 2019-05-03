import { Component, forwardRef, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProdutoService } from '../../../base/services/produto.service';
import { Produto } from '../../../pages/basic-store/produto/produto';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProdutoAutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'bsc-produto-auto-complete',
  templateUrl: './produto-auto-complete.component.html',
  styleUrls: ['./produto-auto-complete.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class ProdutoAutoCompleteComponent implements ControlValueAccessor {
  @Input() formControl: FormControl = new FormControl();
  @Output('onSelect') onSelect = new EventEmitter<Produto>();
  @ViewChild('input') inputRef: ElementRef;
  searching;
  searchFailed;
  onChange;
  value;

  constructor(private produtoService: ProdutoService) { }

  search = (text$: Observable<Produto>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.produtoService.findByName(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  formatter = produto => { 
    this.onSelect.emit(produto);
    this.value = produto;
    return `${produto.descricao} - ${produto.tamanho} - ${produto.cor}`;
  };
  
  getDescricao(produto){
    return `${produto.descricao} - ${produto.tamanho} - ${produto.cor}`;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
