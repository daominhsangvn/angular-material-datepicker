import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
export declare class DatePickerComponent implements ControlValueAccessor, OnInit {
    private readonly dialog;
    private dateVal;
    dayNames: Array<Weekday>;
    monthNames: Array<Month>;
    formattedDate: string;
    dateChange: EventEmitter<Date>;
    date: Date;
    constructor(dialog: MdDialog);
    ngOnInit(): void;
    openDialog(): void;
    private formatDate(date);
    private _onValueTouched;
    private _onValueChange;
    value: any;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    writeValue(value: any): void;
}
