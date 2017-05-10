import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdInputModule,
  MdRippleModule,
  MdButtonModule,
  MdIconModule,
  MdDialogModule
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
})
export class DatePickerModule { }
