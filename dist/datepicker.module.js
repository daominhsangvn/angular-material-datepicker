import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdRippleModule, MdButtonModule, MdIconModule, MdDialogModule } from '@angular/material';
import { DatePickerComponent } from './datepicker.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    return DatePickerModule;
}());
export { DatePickerModule };
DatePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DatePickerComponent,
                    CalendarComponent
                ],
                imports: [
                    CommonModule,
                    MdInputModule,
                    MdRippleModule,
                    MdButtonModule,
                    MdIconModule,
                    MdDialogModule
                ],
                exports: [
                    DatePickerComponent
                ],
                providers: [
                    CalendarService
                ],
                entryComponents: [
                    CalendarComponent
                ]
            },] },
];
/** @nocollapse */
DatePickerModule.ctorParameters = function () { return []; };
