import { EventEmitter, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Month } from './month.model';
import { Weekday } from './weekday.model';
export declare class DatePickerComponent implements OnInit {
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
}
