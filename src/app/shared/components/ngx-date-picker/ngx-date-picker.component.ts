import { Component, OnInit, forwardRef, Input, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-date-picker',
  templateUrl: './ngx-date-picker.component.html',
  styleUrls: ['./ngx-date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxDatePickerComponent),
    multi: true
  }]
})
export class NgxDatePickerComponent implements OnInit, ControlValueAccessor {
  isDisabled = false;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  propagateChange = (_: any) => { };
  _value: any;
  bsValue: Date;

  bsConfig = Object.assign({}, {
    dateInputFormat: 'DD/MM/YYYY',
  });

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
      this.bsValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onDateSelect(event) {
    this.propagateChange(event);
  }

  private toDate(dateStr) {
    const parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

}
