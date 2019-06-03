import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class BaseComponent {

  rows = [];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;

  tamanhos = [
    { value: 'PP', title: 'PP' },
    { value: 'P', title: 'P' },
    { value: 'M', title: 'M' },
    { value: 'G', title: 'G' },
    { value: 'GG', title: 'GG' },
    { value: 'XG', title: 'XG' },
    { value: 'XXG', title: 'XXG' }
  ]

  ngbDateToDate(data: NgbDateStruct): Date {
    return data ? new Date(data.year, data.month - 1, data.day) : null;
  }

  ngbDateToStrDate(data: NgbDateStruct): string {
    return data ? `${data.day}/${data.month}/${data.year}` : null;
  }

  dateToNgbDate(data: Date) {
    const date = new Date(data);
    const ngbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
    return ngbDateStruct;
  }

  parseNumber(strinValue) {
    let strg = strinValue || '';
    let decimal = '.';
    strg = strg.replace(/[^0-9$.,]/g, '');
    if (strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
    if ((strg.match(new RegExp('\\' + decimal, 'g')) || []).length > 1) decimal = '';
    if (decimal != '' && (strg.length - strg.indexOf(decimal) - 1 == 3)
      && strg.indexOf('0' + decimal) !== 0) decimal = '';
    strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '');
    strg = strg.replace(',', '.');
    return parseFloat(strg);
  }
}
