import {
  Component, ElementRef, forwardRef, OnInit, Renderer,
  ViewChild, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ClienteService } from '../../../base/services/cliente.service';
import { Cliente } from '../../../pages/basic-store/cliente/cliente';

@Component({
  selector: 'bsc-cliente-auto-complete',
  templateUrl: './cliente-auto-complete.component.html',
  styleUrls: ['./cliente-auto-complete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClienteAutoCompleteComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteAutoCompleteComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') inputRef: ElementRef;
  @Output() onSelect = new EventEmitter<Cliente>();
  searching;
  searchFailed;
  propagateChange = (_: any) => { };
  value;

  cliente: Cliente;

  constructor(private clienteService: ClienteService,
    private renderer: Renderer) { }

  ngOnInit(): void {
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

  formatter = cliente => {
    this.propagateChange(cliente);
    this.onSelect.emit(cliente);
    return cliente.nome;
  }

  onChange(event) {
    this.value = event.target.value;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
      this.inputRef.nativeElement.value = obj instanceof String ? obj : obj.nome;
    } else {
      this.inputRef.nativeElement.value = null;
    }
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
