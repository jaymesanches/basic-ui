import { NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    const x: String = '01/01/1900';
    const df: Date = new Date();

    return date ? {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate()
    } : null;

  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0)) : null;
  }
}
