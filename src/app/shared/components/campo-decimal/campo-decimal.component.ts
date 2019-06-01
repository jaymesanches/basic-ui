import { Component, OnInit, ElementRef, ViewChild, Renderer, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'bsc-campo-decimal',
  templateUrl: './campo-decimal.component.html',
  styleUrls: ['./campo-decimal.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CampoDecimalComponent),
    multi: true
  }]
})
export class CampoDecimalComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') inputRef: ElementRef;
  @Input() label = 'Valor';
  propagateChange = (_: any) => { };
  value;
  public numberMask;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.numberMask = createNumberMask({
      prefix: '',
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.',
      requireDecimal: true,
      allowLeadingZeroes: true,
      decimalLimit: 2,
    });
  }

  onChange(event) {
    this.value = this.formatDecimalValue(event.target.value);
    event.target.value = this.value;
    this.propagateChange(this.value);
  }

  writeValue(obj: any): void {
    if (obj) {
      const strValue = obj.toString();
      this.value = this.formatDecimalValue(strValue);
    }

    this.inputRef.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setElementProperty(this.inputRef.nativeElement, 'disabled', isDisabled);
  }

  private formatDecimalValue(strValue) {
    let newValue = '';

    if (strValue) {
      if (strValue.includes('.')) {
        newValue = strValue.replace('.', ',');
      } else if (strValue.includes(',')) {
        const split = strValue.split(',');

        if (split && !split[1] || split[1] === '') {
          newValue += strValue + '00';
        }
      } else {
        newValue += strValue + ',00';
      }
    }

    return newValue;
  }

}
