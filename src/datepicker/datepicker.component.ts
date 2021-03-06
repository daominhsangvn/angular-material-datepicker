import {Component, Output, Input, EventEmitter, OnInit, forwardRef} from '@angular/core';
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
import {MdDialog} from '@angular/material';

import {CalendarComponent} from './calendar.component';
import {Month} from './month.model';
import {Weekday} from './weekday.model';
import {LANG_EN} from './lang-en';

@Component({
  selector: 'md-datepicker',
  template: `
    <md-input-container flex>
      <input mdInput (click)="openDialog()" mdInput [value]="formattedDate" (ngModelChange)="onChange($event)">
      <md-icon mdPrefix>date_range</md-icon>
    </md-input-container>
  `,
  exportAs: 'datePicker',
  providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  private readonly dialog: MdDialog;
  private dateVal: Date;
  private _format = 'MM/dd/yyyy';

  dayNames: Array<Weekday>;
  monthNames: Array<Month>;
  formattedDate: string;

  @Output()
  public dateChange = new EventEmitter<Date>();

  @Input()
  get format(): string {
    return this._format;
  }

  set format(value) {
    this._format = value;
  }

  @Input()
  get date(): Date {
    return this.dateVal;
  };

  set date(val: Date) {
    this.dateVal = val;
    // Update ngModel
    this._onValueChange(val);
    setTimeout(() => {
      // trigger dateChange event
      this.dateChange.emit(val);
    });
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

  private _MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private _DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  private _LZ(x) {
    return (x < 0 || x > 9 ? "" : "0") + x;
  }

  // http://mattkruse.com/javascript/date/source.html
  private _formatDate(date, format) {
    format = format + "";
    let result = "";
    let i_format = 0;
    let c = "";
    let token = "";
    let y = date.getYear().toString();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let E = date.getDay();
    let Ho = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
    // Convert real date parts into formatted versions
    let value = {};
    if (y.length < 4) {
      y = (y - 0 + 1900).toString();
    }
    value["y"] = "" + y;
    value["yyyy"] = y;
    value["yy"] = y.substring(2, 4);
    value["M"] = M;
    value["MM"] = this._LZ(M);
    value["MMM"] = this._MONTH_NAMES[M - 1];
    value["NNN"] = this._MONTH_NAMES[M + 11];
    value["d"] = d;
    value["dd"] = this._LZ(d);
    value["E"] = this._DAY_NAMES[E + 7];
    value["EE"] = this._DAY_NAMES[E];
    value["H"] = Ho;
    value["HH"] = this._LZ(Ho);
    if (Ho == 0) {
      value["h"] = 12;
    }
    else if (Ho > 12) {
      value["h"] = Ho - 12;
    }
    else {
      value["h"] = Ho;
    }
    value["hh"] = this._LZ(value["h"]);
    if (Ho > 11) {
      value["K"] = Ho - 12;
    } else {
      value["K"] = Ho;
    }
    value["k"] = Ho + 1;
    value["KK"] = this._LZ(value["K"]);
    value["kk"] = this._LZ(value["k"]);
    if (Ho > 11) {
      value["a"] = "PM";
    }
    else {
      value["a"] = "AM";
    }
    value["m"] = m;
    value["mm"] = this._LZ(m);
    value["s"] = s;
    value["ss"] = this._LZ(s);
    while (i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while ((format.charAt(i_format) == c) && (i_format < format.length)) {
        token += format.charAt(i_format++);
      }
      if (value[token] != null) {
        result = result + value[token];
      }
      else {
        result = result + token;
      }
    }
    return result;
  }

  private formatDate(date: Date): string {
    if (!date) {
      return '';
    }
    return this._formatDate(date, this._format);
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
