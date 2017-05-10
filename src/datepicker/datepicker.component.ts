import { Component, Output, Input, EventEmitter, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

// ngModel
const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};
import { MdDialog } from '@angular/material';

import { CalendarComponent } from './calendar.component';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
import { LANG_EN } from './lang-en';

@Component({
  selector: 'md-datepicker',
  template: `
    <md-input-container>
      <input mdInput (click)="openDialog()" mdInput [value]="formattedDate" (ngModelChange)="onChange($event)">
      <md-icon mdPrefix>date_range</md-icon>
    </md-input-container>
  `,
  exportAs: 'datePicker',
  providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  private readonly dialog:MdDialog;
  private dateVal: Date;

  dayNames: Array<Weekday>;
  monthNames: Array<Month>;
  formattedDate: string;

  @Output()
  dateChange = new EventEmitter<Date>();

  @Input()
  get date(): Date {
    return this.dateVal;
  };
  set date(val: Date) {
    this.dateVal = val;
    // Update ngModel
    this._onValueChange(val);
    // trigger dateChange event
    this.dateChange.emit(val);
    // format date
    this.formattedDate = this.formatDate(val);
  }

  constructor(dialog: MdDialog) {
    this.dialog = dialog;
    this.dayNames = LANG_EN.weekDays;
    this.monthNames = LANG_EN.months;
  }

  ngOnInit() {
    if (this.date === undefined) {
      this.date = new Date();
    }
  }

  openDialog() {
    let ref = this.dialog.open(CalendarComponent);

    // Workaround to update style of dialog which sits outside of the component
    let containerDiv = (<any>ref)._overlayRef._pane.children[0];
    containerDiv.style['padding'] = '0';

    ref.componentInstance.submit.subscribe(result => {
      this.date = result;
      ref.close();
    });
    ref.componentInstance.cancel.subscribe(result => {
      ref.close();
    });
  }

  private formatDate(date:Date): string {
    if (date === undefined) {
      return ;
    }
    let dayOfWeek = this.dayNames[date.getDay()].short;
    let dayOfMonth = date.getDate();
    let month = this.monthNames[date.getMonth()].short;
    let year = date.getFullYear();
    return `${dayOfWeek}, ${dayOfMonth}. ${month} ${year}`;
  }

  // ngModel
  private _onValueTouched = () => {
  };
  private _onValueChange = (_: any) => {
  };

  // get accessor
  public get value(): any {
    console.log('get value');
    return this.date;
  };

  // set accessor including call the onchange callback
  public set value(v: any) {
    console.log('set value', v);
    this._onValueChange(v);
  }

  // From ControlValueAccessor interface
  public registerOnChange(fn: (value: any) => any): void {
    this._onValueChange = fn;
  }

  // From ControlValueAccessor interface
  public registerOnTouched(fn: () => any): void {
    this._onValueTouched = fn;
  }

  // From ControlValueAccessor interface
  // ngModel change
  public writeValue(value: any) {
    this.date = value;
  }
}
