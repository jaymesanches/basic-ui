import { Component, OnInit, ViewChild, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-control-value-acessor',
  templateUrl: './control-value-acessor.component.html',
  styleUrls: ['./control-value-acessor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlValueAcessorComponent),
    multi: true
  }]
})
export class ControlValueAcessorComponent implements OnInit, ControlValueAccessor {
  @Input('input') input;
  propagateChange = (_: any) => { };
  _value;

  constructor() { }

  ngOnInit() {
  }

  onChange(event){
    this._value = event.target.value;
    this.propagateChange(this._value);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }
}
