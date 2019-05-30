import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, 
  NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CampoDecimalComponent } from './components/campo-decimal/campo-decimal.component';
import { ClienteAutoCompleteComponent } from './components/cliente-auto-complete/cliente-auto-complete.component';
import { ControlValueAcessorComponent } from './components/control-value-acessor/control-value-acessor.component';
import { DatePickerI18n, I18n } from './components/date-picker/date-picker-i18n';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgbDatePTParserFormatter } from './components/date-picker/ngb-date-parser';
import { ProdutoAutoCompleteComponent } from './components/produto-auto-complete/produto-auto-complete.component';
import { SharedRoutingModule } from './shared-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatePickerComponent } from './components/ngx-date-picker/ngx-date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ClienteAutoCompleteComponent,
    ProdutoAutoCompleteComponent,
    ControlValueAcessorComponent,
    DatePickerComponent,
    CampoDecimalComponent,
    NgxDatePickerComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    NguiAutoCompleteModule,
    SharedRoutingModule,
    NgbDatepickerModule,
    CurrencyMaskModule,
    TextMaskModule,
    BsDatepickerModule
  ],
  exports: [
    ClienteAutoCompleteComponent,
    ProdutoAutoCompleteComponent,
    ControlValueAcessorComponent,
    DatePickerComponent,
    NgxDatePickerComponent,
    CampoDecimalComponent],
  providers: [
    [I18n, { provide: NgbDatepickerI18n, useClass: DatePickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
  ]
})
export class SharedModule { }
