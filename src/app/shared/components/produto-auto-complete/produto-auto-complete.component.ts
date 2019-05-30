import {
  Component, forwardRef, Input, Output, EventEmitter,
  ElementRef, ViewChild, ChangeDetectionStrategy, Renderer
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ProdutoService } from '../../../base/services/produto.service';
import { Produto } from '../../../pages/basic-store/produto/produto';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => ProdutoAutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'bsc-produto-auto-complete',
  templateUrl: './produto-auto-complete.component.html',
  styleUrls: ['./produto-auto-complete.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoAutoCompleteComponent implements ControlValueAccessor {
  @Input() formControl: FormControl = new FormControl();
  @Output() onSelect = new EventEmitter<Produto>();
  @ViewChild('input') inputRef: ElementRef;
  searching;
  searchFailed;
  propagateChange = (_: any) => { };
  value;

  constructor(private produtoService: ProdutoService,
    private renderer: Renderer) { }

  search = (text$: Observable<Produto>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.produtoService.pesquisarPorDescricao(term).pipe(
          tap(() => { this.searchFailed = false; }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = produto => {
    this.onSelect.emit(produto);
    this.value = produto;
    this.propagateChange(produto);
    return `${produto.descricao} - ${produto.cor}`;
  }

  getDescricao(produto) {
    return `${produto.descricao} - ${produto.cor}`;
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (!obj) {
      this.inputRef.nativeElement.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setElementProperty(this.inputRef.nativeElement, 'disabled', isDisabled);
  }
}
