import { Component, ElementRef, forwardRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { ClienteService } from '../../../base/services/cliente.service';
import { Cliente } from '../../../pages/basic-store/cliente/cliente';

@Component({
  selector: 'bsc-cliente-auto-complete-v2',
  templateUrl: './cliente-auto-complete-v2.component.html',
  styleUrls: ['./cliente-auto-complete-v2.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClienteAutoCompleteV2Component),
    multi: true
  }],
})
export class ClienteAutoCompleteV2Component implements ControlValueAccessor, OnInit {
  @ViewChild('input') inputRef: ElementRef;
  propagateChange = (_: any) => { };
  value;
  searching;
  searchFailed;

  private clientes: Cliente[];

  constructor(private clienteService: ClienteService,
    private renderer: Renderer) { }

  ngOnInit() {
  }

  private filterString: Subject<string> = new Subject<string>();

  seila = (text$: Observable<Cliente>) => {
    return this.clienteService.pesquisarPorNome(text$);
  }

  search = (text$: Observable<Cliente>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.clienteService.pesquisarPorNome(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  onChange(event) {
    this.value = event.target.value;
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.inputRef.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('DISABLED STATE', isDisabled);
    this.renderer.setElementProperty(this.inputRef.nativeElement, 'disabled', isDisabled);
  }

}
