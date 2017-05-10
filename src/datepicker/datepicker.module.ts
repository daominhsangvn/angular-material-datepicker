import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdRippleModule,
  MdButtonModule,
  MdIconModule
} from '@angular/material';
import { DatePickerComponent } from './datepicker.component';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

@NgModule({
  declarations: [
    DatePickerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MdRippleModule,
    MdButtonModule,
    MdIconModule
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
})
export class DatePickerModule { }
