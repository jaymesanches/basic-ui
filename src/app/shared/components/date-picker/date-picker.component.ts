import { Component, OnInit, forwardRef, Input, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbInputDatepicker, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbStringAdapter } from './ngb-string-adapter';

@Component({
  selector: 'bsc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NgbDateAdapter, useClass: NgbStringAdapter
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() d: NgbInputDatepicker;
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  propagateChange = (_: any) => { };
  _value;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  onDateSelect(event) {
    this.propagateChange(event);
  }

  writeValue(value: any): void {
    console.log('VALUE', value);

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
    // this.renderer.setElementProperty(this.d. (isDisabled), 'disabled', isDisabled);
  }

}
