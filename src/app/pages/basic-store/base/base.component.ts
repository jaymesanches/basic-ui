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
    const ngbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    return ngbDateStruct;
  }
}
