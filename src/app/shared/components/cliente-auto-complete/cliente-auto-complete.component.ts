import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ClienteService } from '../../../base/services/cliente.service';
import { Cliente } from '../../../pages/basic-store/cliente/cliente';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClienteAutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'bsc-cliente-auto-complete',
  templateUrl: './cliente-auto-complete.component.html',
  styleUrls: ['./cliente-auto-complete.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class ClienteAutoCompleteComponent implements ControlValueAccessor {
  @Input() formControl: FormControl = new FormControl();
  @ViewChild('input') inputRef: ElementRef;

  @Output('onSelect') onSelect = new EventEmitter<Cliente>();

  searching;
  searchFailed;

  constructor(private clienteService: ClienteService) { }


  search = (text$: Observable<Cliente>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.clienteService.findByName(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  formatter = cliente => { 
    this.onSelect.emit(cliente);
    return cliente.nome;
  };

  writeValue(obj: any): void {
    //throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    //throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    //throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error("Method not implemented.");
  }
}
