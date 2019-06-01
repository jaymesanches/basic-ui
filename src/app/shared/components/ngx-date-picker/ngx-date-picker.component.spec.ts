import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatePickerComponent } from './ngx-date-picker.component';

describe('NgxDatePickerComponent', () => {
  let component: NgxDatePickerComponent;
  let fixture: ComponentFixture<NgxDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
